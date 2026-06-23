import Order, {
  OrderStatus,
  PaymentStatus,
} from "../models/Order";
import Product from "../models/Product";
import {
  detectIntent,
} from "../utils/telegramIntent";
import {
  parseRestockCommand,
  parseSetStockCommand,
} from "../utils/productActions";
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
                `• ${item.name} × ${item.quantity}`
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

    product.stock +=
      amount;
    product.inStock =
      product.stock > 0;

    await product.save();

    return `✅ ${product.name} restocked by ${amount}. Current stock: ${product.stock}.`;
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

    product.stock =
      stock;
    product.inStock =
      stock > 0;

    await product.save();

    return `✅ ${product.name} stock set to ${product.stock}.`;
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

    return `
📦 PRODUCT DETAILS

Product Name:
${product.name}

Category:
${product.category}

Stock:
${product.stock}

Low Stock Threshold:
${product.lowStockThreshold}

Price:
${formatCurrency(product.price)}

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
    const products =
      await Product.find({
        stock: {
          $gt: 0,
        },
        $expr: {
          $lte: [
            "$stock",
            "$lowStockThreshold",
          ],
        },
      }).sort({
        stock: 1,
        name: 1,
      });

    if (products.length === 0) {
      return "✅ No low stock products.";
    }

    return `
⚠️ LOW STOCK REPORT

${products
  .map(
    (
      product
    ) =>
      `${product.name} - ${product.stock} left (threshold: ${product.lowStockThreshold})`
  )
  .join("\n")}
`;
  };

const outOfStockReport =
  async () => {
    const products =
      await Product.find({
        stock: {
          $lte: 0,
        },
      }).sort({
        name: 1,
      });

    if (products.length === 0) {
      return "✅ No out of stock products.";
    }

    return `
🚨 OUT OF STOCK REPORT

${products
  .map(
    (
      product
    ) =>
      product.name
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
      lowStock,
      outOfStock,
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
        Product.countDocuments({
          stock: {
            $gt: 0,
          },
          $expr: {
            $lte: [
              "$stock",
              "$lowStockThreshold",
            ],
          },
        }),
        Product.countDocuments({
          stock: {
            $lte: 0,
          },
        }),
      ]);

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
      lowStock,
      outOfStock,
    ] =
      await Promise.all([
        Product.countDocuments(),
        Product.countDocuments({
          stock: {
            $gt: 0,
          },
          $expr: {
            $lte: [
              "$stock",
              "$lowStockThreshold",
            ],
          },
        }),
        Product.countDocuments({
          stock: {
            $lte: 0,
          },
        }),
      ]);

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
/stock
/revenue
/summary
/today
/low-stock
/out-of-stock
/top-products
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
Show today’s revenue
Give me inventory summary
How many delivered orders do we have?
Which products are out of stock?
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
