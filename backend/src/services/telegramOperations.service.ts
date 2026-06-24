import Order, {
  OrderStatus,
  PaymentStatus,
} from "../models/Order";
import Product from "../models/Product";
import User from "../models/User";
import {
  detectIntent,
} from "../utils/telegramIntent";
import {
  parseRestockCommand,
  parseSetStockCommand,
} from "../utils/productActions";
import {
  getInventoryItems,
  getVariantSizes,
} from "../utils/inventory";
import {
  buildDailyOperationsReportMessage,
} from "./operationsReport.service";

const formatCurrency =
  (
    amount: number
  ) =>
    `₦${amount.toLocaleString()}`;

const escapeRegExp =
  (
    value: string
  ) =>
    value.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

const cleanName =
  (
    value: string
  ) =>
    value
      .trim()
      .replace(
        /\s+/g,
        " "
      );

const normalizeOrderNumber =
  (
    value: string
  ) =>
    value.trim().toUpperCase();

const getStartOfToday =
  () => {
    const start =
      new Date();

    start.setHours(
      0,
      0,
      0,
      0
    );

    return start;
  };

type PendingAction =
  | {
      type: "cancel-order";
      orderNumber: string;
    }
  | {
      type: "delete-product";
      productName: string;
    }
  | {
      type: "refund-payment";
      orderNumber: string;
    };

const pendingConfirmations =
  new Map<string, PendingAction>();

const getProductByName =
  async (
    productName: string
  ) => {
    const name =
      cleanName(
        productName
      );

    return Product.findOne({
      name: {
        $regex:
          `^${escapeRegExp(name)}$`,
        $options:
          "i",
      },
    });
  };

type TelegramProduct =
  NonNullable<
    Awaited<
      ReturnType<typeof getProductByName>
    >
  >;

const findInventorySize =
  (
    product: TelegramProduct
  ) => {
    if (
      !product.variants ||
      product.variants.length === 0
    ) {
      product.variants = [
        {
          color: "Default",
          sizes: [
            {
              size: "Standard",
              price:
                product.price ?? 0,
              stock:
                product.stock ?? 0,
              lowStockThreshold:
                product.lowStockThreshold ??
                10,
            },
          ],
        },
      ];
    }

    return {
      variant:
        product.variants[0],
      size:
        product.variants[0]
          ?.sizes[0],
    };
  };

const formatOrderDetails =
  (
    order: Awaited<ReturnType<typeof Order.findOne>>
  ) => {
    if (!order) {
      return "Order not found.";
    }

    const customer =
      order.shippingAddress?.fullName ||
      "Customer not available";

    const products =
      order.items.length > 0
        ? order.items
            .map(
              (
                item
              ) =>
                `• ${item.name} (${item.color ?? "Default"} / ${item.size ?? "Standard"}) × ${item.quantity}`
            )
            .join("\n")
        : "No products";

    const quantity =
      order.items.reduce(
        (
          total,
          item
        ) =>
          total +
          item.quantity,
        0
      );

    return `
📦 ORDER DETAILS

Order Number:
${order.orderNumber}

Customer:
${customer}

Products:
${products}

Quantity:
${quantity}

Amount:
${formatCurrency(order.totalAmount)}

Payment Status:
${order.paymentStatus}

Order Status:
${order.status}

Created Date:
${order.createdAt.toLocaleString()}
`;
  };

const showOrder =
  async (
    orderNumber: string
  ) => {
    const order =
      await Order.findOne({
        orderNumber:
          normalizeOrderNumber(
            orderNumber
          ),
      });

    return formatOrderDetails(
      order
    );
  };

const markOrderStatus =
  async (
    orderNumber: string,
    status: OrderStatus
  ) => {
    const order =
      await Order.findOneAndUpdate(
        {
          orderNumber:
            normalizeOrderNumber(
              orderNumber
            ),
        },
        {
          status,
        },
        {
          new: true,
        }
      );

    if (!order) {
      return "Order not found.";
    }

    return `✅ Order ${order.orderNumber} marked as ${status}.`;
  };

const cancelOrder =
  async (
    orderNumber: string
  ) =>
    markOrderStatus(
      orderNumber,
      "cancelled"
    );

const refundPayment =
  async (
    orderNumber: string
  ) => {
    const order =
      await Order.findOneAndUpdate(
        {
          orderNumber:
            normalizeOrderNumber(
              orderNumber
            ),
        },
        {
          paymentStatus:
            "refunded" satisfies PaymentStatus,
        },
        {
          new: true,
        }
      );

    if (!order) {
      return "Order not found.";
    }

    return `✅ Payment for ${order.orderNumber} marked as refunded.`;
  };

const restockProduct =
  async (
    productName: string,
    amount: number
  ) => {
    const product =
      await getProductByName(
        productName
      );

    if (!product) {
      return "Product not found.";
    }

    const {
      variant,
      size,
    } =
      findInventorySize(
        product
      );

    if (!variant || !size) {
      return "Product has no inventory sizes configured.";
    }

    size.stock +=
      amount;

    await product.save();

    return `✅ ${product.name} (${variant.color} / ${size.size}) restocked by ${amount}. Current stock: ${size.stock}.`;
  };

const setProductStock =
  async (
    productName: string,
    stock: number
  ) => {
    const product =
      await getProductByName(
        productName
      );

    if (!product) {
      return "Product not found.";
    }

    const {
      variant,
      size,
    } =
      findInventorySize(
        product
      );

    if (!variant || !size) {
      return "Product has no inventory sizes configured.";
    }

    size.stock =
      stock;

    await product.save();

    return `✅ ${product.name} (${variant.color} / ${size.size}) stock set to ${size.stock}.`;
  };

const showProduct =
  async (
    productName: string
  ) => {
    const product =
      await getProductByName(
        productName
      );

    if (!product) {
      return "Product not found.";
    }

    const inventory =
      getVariantSizes(
        product
      );

    const inventoryLines =
      inventory
        .map(
          (
            item
          ) =>
            `• ${item.color} / ${item.size}: ${item.stock} left, threshold ${item.lowStockThreshold}, ${formatCurrency(item.price)}`
        )
        .join("\n");

    return `
📦 PRODUCT DETAILS

Product Name:
${product.name}

Category:
${product.category}

Inventory:
${inventoryLines}

In Stock Status:
${product.inStock ? "In Stock" : "Out Of Stock"}
`;
  };

const deleteProduct =
  async (
    productName: string
  ) => {
    const product =
      await getProductByName(
        productName
      );

    if (!product) {
      return "Product not found.";
    }

    await product.deleteOne();

    return `✅ ${product.name} deleted.`;
  };

const lowStockReport =
  async () => {
    const inventory =
      getInventoryItems(
        await Product.find()
      )
        .filter(
          (
            item
          ) =>
            item.stock > 0 &&
            item.stock <=
              item.lowStockThreshold
        )
        .sort(
          (
            a,
            b
          ) =>
            a.stock -
            b.stock
        );

    if (inventory.length === 0) {
      return "✅ No low stock products.";
    }

    return `
⚠️ LOW STOCK REPORT

${inventory
  .map(
    (
      item
    ) =>
      `${item.productName} - ${item.color} / ${item.size}: ${item.stock} left (threshold: ${item.lowStockThreshold})`
  )
  .join("\n")}
`;
  };

const outOfStockReport =
  async () => {
    const inventory =
      getInventoryItems(
        await Product.find()
      )
        .filter(
          (
            item
          ) =>
            item.stock <= 0
        )
        .sort(
          (
            a,
            b
          ) =>
            a.productName.localeCompare(
              b.productName
            )
        );

    if (inventory.length === 0) {
      return "✅ No out of stock products.";
    }

    return `
🚨 OUT OF STOCK REPORT

${inventory
  .map(
    (
      item
    ) =>
      `${item.productName} - ${item.color} / ${item.size}`
  )
  .join("\n")}
`;
  };

const summary =
  async () => {
    const [
      paidOrders,
      orders,
      pending,
      processing,
      delivered,
      cancelled,
      products,
    ] =
      await Promise.all([
        Order.find({
          paymentStatus:
            "paid",
        }).select("totalAmount"),
        Order.countDocuments(),
        Order.countDocuments({
          status:
            "pending",
        }),
        Order.countDocuments({
          status:
            "processing",
        }),
        Order.countDocuments({
          status:
            "delivered",
        }),
        Order.countDocuments({
          status:
            "cancelled",
        }),
        Product.find(),
      ]);

    const inventory =
      getInventoryItems(
        products
      );

    const lowStock =
      inventory.filter(
        (
          item
        ) =>
          item.stock > 0 &&
          item.stock <=
            item.lowStockThreshold
      ).length;

    const outOfStock =
      inventory.filter(
        (
          item
        ) =>
          item.stock <= 0
      ).length;

    const revenue =
      paidOrders.reduce(
        (
          total,
          order
        ) =>
          total +
          order.totalAmount,
        0
      );

    return `
📊 OPERATIONS SUMMARY

Revenue:
${formatCurrency(revenue)}

Orders:
${orders}

Pending:
${pending}

Processing:
${processing}

Delivered:
${delivered}

Cancelled:
${cancelled}

Low Stock:
${lowStock}

Out Of Stock:
${outOfStock}
`;
  };

const today =
  async () => {
    const start =
      getStartOfToday();

    const todayOrders =
      await Order.find({
        createdAt: {
          $gte:
            start,
        },
      });

    const revenue =
      todayOrders
        .filter(
          (
            order
          ) =>
            order.paymentStatus ===
            "paid"
        )
        .reduce(
          (
            total,
            order
          ) =>
            total +
            order.totalAmount,
          0
        );

    return `
📅 TODAY

Today’s Orders:
${todayOrders.length}

Today’s Revenue:
${formatCurrency(revenue)}
`;
  };

const revenue =
  async () => {
    const paidOrders =
      await Order.find({
        paymentStatus:
          "paid",
      }).select("totalAmount");

    const totalRevenue =
      paidOrders.reduce(
        (
          total,
          order
        ) =>
          total +
          order.totalAmount,
        0
      );

    const averageOrderValue =
      paidOrders.length > 0
        ? totalRevenue /
          paidOrders.length
        : 0;

    return `
💰 REVENUE

Total Revenue:
${formatCurrency(totalRevenue)}

Average Order Value:
${formatCurrency(Math.round(averageOrderValue))}

Total Orders:
${paidOrders.length}
`;
  };

const stock =
  async () => {
    const [
      totalProducts,
      products,
    ] =
      await Promise.all([
        Product.countDocuments(),
        Product.find(),
      ]);

    const inventory =
      getInventoryItems(
        products
      );

    const lowStock =
      inventory.filter(
        (
          item
        ) =>
          item.stock > 0 &&
          item.stock <=
            item.lowStockThreshold
      ).length;

    const outOfStock =
      inventory.filter(
        (
          item
        ) =>
          item.stock <= 0
      ).length;

    return `
📦 INVENTORY SUMMARY

Total Products:
${totalProducts}

Low Stock:
${lowStock}

Out Of Stock:
${outOfStock}
`;
  };

const pendingOrders =
  async () => {
    const pending =
      await Order.countDocuments({
        status:
          "pending",
      });

    return `📦 Pending Orders\n\n${pending}`;
  };

const deliveredOrders =
  async () => {
    const delivered =
      await Order.countDocuments({
        status:
          "delivered",
      });

    return `📦 Delivered Orders\n\n${delivered}`;
  };

const cancelledOrders =
  async () => {
    const cancelled =
      await Order.countDocuments({
        status:
          "cancelled",
      });

    return `📦 Cancelled Orders\n\n${cancelled}`;
  };

const orderCount =
  async () => {
    const orders =
      await Order.countDocuments();

    return `📦 Total Orders\n\n${orders}`;
  };

interface TopProductResult {
  _id: string;
  unitsSold: number;
  revenue: number;
}

const topProducts =
  async () => {
    const products =
      await Order.aggregate<TopProductResult>([
        {
          $match: {
            status: {
              $ne:
                "cancelled",
            },
          },
        },
        {
          $unwind:
            "$items",
        },
        {
          $group: {
            _id:
              "$items.name",
            unitsSold: {
              $sum:
                "$items.quantity",
            },
            revenue: {
              $sum: {
                $multiply: [
                  "$items.price",
                  "$items.quantity",
                ],
              },
            },
          },
        },
        {
          $sort: {
            unitsSold:
              -1,
          },
        },
        {
          $limit:
            5,
        },
      ]);

    if (products.length === 0) {
      return "No product sales yet.";
    }

    return `
🏆 TOP SELLING PRODUCTS

${products
  .map(
    (
      product,
      index
    ) =>
      `${index + 1}. ${product._id} - ${product.unitsSold} sold (${formatCurrency(product.revenue)})`
  )
  .join("\n")}
`;
  };

const topProductsThisMonth =
  async () => {
    const start =
      new Date();

    start.setDate(
      1
    );
    start.setHours(
      0,
      0,
      0,
      0
    );

    const products =
      await Order.aggregate<TopProductResult>([
        {
          $match: {
            status: {
              $ne:
                "cancelled",
            },
            createdAt: {
              $gte:
                start,
            },
          },
        },
        {
          $unwind:
            "$items",
        },
        {
          $group: {
            _id:
              "$items.name",
            unitsSold: {
              $sum:
                "$items.quantity",
            },
            revenue: {
              $sum: {
                $multiply: [
                  "$items.price",
                  "$items.quantity",
                ],
              },
            },
          },
        },
        {
          $sort: {
            unitsSold:
              -1,
          },
        },
        {
          $limit:
            5,
        },
      ]);

    if (products.length === 0) {
      return "No product sales this month yet.";
    }

    return `
🏆 BEST SELLERS THIS MONTH

${products
  .map(
    (
      product,
      index
    ) =>
      `${index + 1}. ${product._id} - ${product.unitsSold} sold (${formatCurrency(product.revenue)})`
  )
  .join("\n")}
`;
  };

interface TopCustomerResult {
  _id: string;
  orders: number;
  revenue: number;
}

const topCustomers =
  async () => {
    const customers =
      await Order.aggregate<TopCustomerResult>([
        {
          $match: {
            paymentStatus:
              "paid",
          },
        },
        {
          $group: {
            _id: {
              $toString:
                "$user",
            },
            orders: {
              $sum:
                1,
            },
            revenue: {
              $sum:
                "$totalAmount",
            },
          },
        },
        {
          $sort: {
            revenue:
              -1,
          },
        },
        {
          $limit:
            5,
        },
      ]);

    if (customers.length === 0) {
      return "No paid customer data yet.";
    }

    const userIds =
      customers.map(
        (
          customer
        ) =>
          customer._id
      );

    const users =
      await User.find({
        _id: {
          $in:
            userIds,
        },
      });

    return `
👥 TOP CUSTOMERS

${customers
  .map(
    (
      customer,
      index
    ) => {
      const user =
        users.find(
          (
            item
          ) =>
            String(
              item._id
            ) ===
            customer._id
        );

      const name =
        user
          ? `${user.firstName} ${user.lastName}`
          : "Unknown Customer";

      return `${index + 1}. ${name} - ${customer.orders} orders (${formatCurrency(customer.revenue)})`;
    }
  )
  .join("\n")}
`;
  };

const paymentStatusReport =
  async (
    status: PaymentStatus,
    title: string
  ) => {
    const orders =
      await Order.find({
        paymentStatus:
          status,
      })
        .sort({
          createdAt: -1,
        })
        .limit(
          20
        );

    if (orders.length === 0) {
      return `✅ No ${title.toLowerCase()}.`;
    }

    return `
${title}

${orders
  .map(
    (
      order
    ) =>
      `${order.orderNumber} - ${formatCurrency(order.totalAmount)} - ${order.createdAt.toLocaleString()}`
  )
  .join("\n")}
`;
  };

const paymentStats =
  async () => {
    const [
      paidOrders,
      failed,
      pending,
      refunded,
    ] =
      await Promise.all([
        Order.find({
          paymentStatus:
            "paid",
        }).select("totalAmount"),
        Order.countDocuments({
          paymentStatus:
            "failed",
        }),
        Order.countDocuments({
          paymentStatus:
            "pending",
        }),
        Order.countDocuments({
          paymentStatus:
            "refunded",
        }),
      ]);

    const totalRevenue =
      paidOrders.reduce(
        (
          total,
          order
        ) =>
          total +
          order.totalAmount,
        0
      );

    return `
💳 PAYMENT STATS

Successful Payments:
${paidOrders.length}

Failed Payments:
${failed}

Pending Payments:
${pending}

Refunded Payments:
${refunded}

Successful Revenue:
${formatCurrency(totalRevenue)}
`;
  };

const dailyReport =
  async () =>
    buildDailyOperationsReportMessage();

const confirmationMessage =
  (
    confirmation: string
  ) => `
⚠️ Confirmation Required

Reply:
${confirmation}
`;

const requestConfirmation =
  (
    confirmation: string,
    action: PendingAction
  ) => {
    pendingConfirmations.set(
      confirmation.toUpperCase(),
      action
    );

    return confirmationMessage(
      confirmation
    );
  };

const executeConfirmedAction =
  async (
    text: string
  ) => {
    const key =
      text.trim().toUpperCase();

    const action =
      pendingConfirmations.get(
        key
      );

    if (!action) {
      return null;
    }

    pendingConfirmations.delete(
      key
    );

    switch (action.type) {
      case "cancel-order":
        return cancelOrder(
          action.orderNumber
        );

      case "delete-product":
        return deleteProduct(
          action.productName
        );

      case "refund-payment":
        return refundPayment(
          action.orderNumber
        );
    }
  };

const helpMessage =
  () => `
🤖 GOD IS INVOLVED OPERATIONS BOT

Available Commands

/pending
/orders
/delivered
/cancelled
/stock
/revenue
/summary
/today
/low-stock
/out-of-stock
/top-products
/best-sellers-month
/top-customers
/daily-report
/payment-stats
/failed-payments
/pending-payments
/successful-payments

Order Commands

Show order ORD-xxxxx
Mark ORD-xxxxx as processing
Mark ORD-xxxxx as shipped
Mark ORD-xxxxx as delivered
Cancel ORD-xxxxx

Inventory Commands

Restock Walnut MDF by 50
Set Walnut MDF stock to 200
Show product Walnut MDF
Low stock report
Out of stock report

Payment Commands

Show payment stats
Show failed payments
Show pending payments
Show successful payments
Refund payment ORD-xxxxx

You can also ask:

Any pending orders?
What products need restocking?
What sold best this month?
Show today’s revenue
Give me inventory summary
How many delivered orders do we have?
Show cancelled orders.
Which products are out of stock?
Who are our top customers?
How much revenue did we make today?

Dangerous actions require confirmation.
`;

const routeNaturalLanguage =
  (
    text: string
  ) => {
    const message =
      text.toLowerCase();

    if (
      message.includes(
        "cancelled"
      ) &&
      message.includes(
        "order"
      )
    ) {
      return "/cancelled";
    }

    if (
      message.includes(
        "delivered"
      ) &&
      message.includes(
        "order"
      )
    ) {
      return "/delivered";
    }

    if (
      message.includes(
        "out of stock"
      )
    ) {
      return "/out-of-stock";
    }

    if (
      (
        message.includes(
          "sold best"
        ) ||
        message.includes(
          "best sellers"
        ) ||
        message.includes(
          "best-selling"
        )
      ) &&
      message.includes(
        "month"
      )
    ) {
      return "/best-sellers-month";
    }

    if (
      message.includes(
        "top customers"
      ) ||
      message.includes(
        "best customers"
      )
    ) {
      return "/top-customers";
    }

    if (
      message.includes(
        "need restocking"
      ) ||
      message.includes(
        "needs restocking"
      )
    ) {
      return "/low-stock";
    }

    const intent =
      detectIntent(
        text
      );

    switch (intent) {
      case "pending":
        return "/pending";

      case "revenue":
        return message.includes(
          "today"
        )
          ? "/today"
          : "/revenue";

      case "stock":
        return "/stock";

      case "summary":
        return "/summary";

      case "today":
        return "/today";

      case "low-stock":
        return "/low-stock";

      case "out-of-stock":
        return "/out-of-stock";

      case "top-products":
        return "/top-products";

      default:
        return "/help";
    }
  };

export const handleTelegramOperationsMessage =
  async (
    text: string
  ): Promise<string> => {
    const confirmed =
      await executeConfirmedAction(
        text
      );

    if (confirmed) {
      return confirmed;
    }

    const trimmed =
      text.trim();

    const showOrderMatch =
      trimmed.match(
        /^show\s+order\s+(ORD-[\w-]+)$/i
      );

    if (showOrderMatch) {
      return showOrder(
        showOrderMatch[1]
      );
    }

    const markOrderMatch =
      trimmed.match(
        /^mark\s+(ORD-[\w-]+)\s+as\s+(processing|shipped|delivered)$/i
      );

    if (markOrderMatch) {
      return markOrderStatus(
        markOrderMatch[1],
        markOrderMatch[2].toLowerCase() as OrderStatus
      );
    }

    const cancelOrderMatch =
      trimmed.match(
        /^cancel\s+(ORD-[\w-]+)$/i
      );

    if (cancelOrderMatch) {
      const orderNumber =
        normalizeOrderNumber(
          cancelOrderMatch[1]
        );

      return requestConfirmation(
        `YES CANCEL ${orderNumber}`,
        {
          type:
            "cancel-order",
          orderNumber,
        }
      );
    }

    const refundPaymentMatch =
      trimmed.match(
        /^refund(?:\s+payment)?(?:\s+for)?\s+(ORD-[\w-]+)$/i
      );

    if (refundPaymentMatch) {
      const orderNumber =
        normalizeOrderNumber(
          refundPaymentMatch[1]
        );

      return requestConfirmation(
        `YES REFUND ${orderNumber}`,
        {
          type:
            "refund-payment",
          orderNumber,
        }
      );
    }

    const deleteProductMatch =
      trimmed.match(
        /^delete(?:\s+product)?\s+(.+)$/i
      );

    if (deleteProductMatch) {
      const productName =
        cleanName(
          deleteProductMatch[1]
        );

      return requestConfirmation(
        `YES DELETE ${productName.toUpperCase()}`,
        {
          type:
            "delete-product",
          productName,
        }
      );
    }

    const restockCommand =
      parseRestockCommand(
        trimmed
      );

    if (restockCommand) {
      return restockProduct(
        restockCommand.productName,
        restockCommand.amount
      );
    }

    const setStockCommand =
      parseSetStockCommand(
        trimmed
      );

    if (setStockCommand) {
      return setProductStock(
        setStockCommand.productName,
        setStockCommand.amount
      );
    }

    const showProductMatch =
      trimmed.match(
        /^show\s+product\s+(.+)$/i
      );

    if (showProductMatch) {
      return showProduct(
        showProductMatch[1]
      );
    }

    const lowStockMatch =
      /^low\s+stock\s+report$/i.test(
        trimmed
      );

    if (lowStockMatch) {
      return lowStockReport();
    }

    const outOfStockMatch =
      /^out\s+of\s+stock\s+report$/i.test(
        trimmed
      );

    if (outOfStockMatch) {
      return outOfStockReport();
    }

    const paymentStatsMatch =
      /^show\s+payment\s+stats$/i.test(
        trimmed
      );

    if (paymentStatsMatch) {
      return paymentStats();
    }

    const failedPaymentsMatch =
      /^show\s+failed\s+payments$/i.test(
        trimmed
      );

    if (failedPaymentsMatch) {
      return paymentStatusReport(
        "failed",
        "❌ FAILED PAYMENTS"
      );
    }

    const pendingPaymentsMatch =
      /^show\s+pending\s+payments$/i.test(
        trimmed
      );

    if (pendingPaymentsMatch) {
      return paymentStatusReport(
        "pending",
        "⏳ PENDING PAYMENTS"
      );
    }

    const successfulPaymentsMatch =
      /^show\s+successful\s+payments$/i.test(
        trimmed
      );

    if (successfulPaymentsMatch) {
      return paymentStatusReport(
        "paid",
        "✅ SUCCESSFUL PAYMENTS"
      );
    }

    const command =
      trimmed.startsWith(
        "/"
      )
        ? trimmed.toLowerCase()
        : routeNaturalLanguage(
            trimmed
          );

    switch (command) {
      case "/pending":
        return pendingOrders();

      case "/orders":
        return orderCount();

      case "/delivered":
        return deliveredOrders();

      case "/cancelled":
        return cancelledOrders();

      case "/stock":
        return stock();

      case "/revenue":
        return revenue();

      case "/summary":
        return summary();

      case "/today":
        return today();

      case "/low-stock":
        return lowStockReport();

      case "/out-of-stock":
        return outOfStockReport();

      case "/top-products":
        return topProducts();

      case "/best-sellers-month":
        return topProductsThisMonth();

      case "/top-customers":
        return topCustomers();

      case "/daily-report":
        return dailyReport();

      case "/payment-stats":
        return paymentStats();

      case "/failed-payments":
        return paymentStatusReport(
          "failed",
          "❌ FAILED PAYMENTS"
        );

      case "/pending-payments":
        return paymentStatusReport(
          "pending",
          "⏳ PENDING PAYMENTS"
        );

      case "/successful-payments":
        return paymentStatusReport(
          "paid",
          "✅ SUCCESSFUL PAYMENTS"
        );

      case "/help":
      default:
        return helpMessage();
    }
  };
