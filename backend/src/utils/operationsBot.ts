export const formatNewOrderAlert =
  (
    orderNumber: string,
    customer: string,
    amount: number,
    items: {
      name: string;
      quantity: number;
    }[]
  ) => {
    const products =
      items
        .map(
          (
            item
          ) =>
            `• ${item.name} × ${item.quantity}`
        )
        .join("\n");

    return `
🛒 NEW ORDER

Order:
${orderNumber}

Customer:
${customer}

Products:
${products}

Amount:
₦${amount.toLocaleString()}

Status:
Pending Payment
`;
  };

export const formatLowStockAlert =
  (
    productName: string,
    stock: number
  ) => {
    return `
⚠️ LOW STOCK

Product:
${productName}

Remaining Stock:
${stock}
`;
  };

export const formatOutOfStockAlert =
  (
    productName: string
  ) => {
    return `
🚨 OUT OF STOCK

Product:
${productName}
`;
  };

export const formatPaymentReceivedAlert =
  (
    orderNumber: string,
    customer: string,
    amount: number,
    items: {
      name: string;
      quantity: number;
    }[]
  ) => {
    const products =
      items
        .map(
          (
            item
          ) =>
            `• ${item.name} × ${item.quantity}`
        )
        .join("\n");

    return `
💳 PAYMENT RECEIVED

Order:
${orderNumber}

Customer:
${customer}

Products:
${products}

Amount:
₦${amount.toLocaleString()}

Status:
Paid
`;
  };

export const formatPaymentFailedAlert =
  (
    orderNumber: string,
    amount: number
  ) => `
❌ PAYMENT FAILED

Order:
${orderNumber}

Amount:
₦${amount.toLocaleString()}
`;
