export const formatNewOrderAlert =
  (
    orderNumber: string,
    customer: string,
    amount: number
  ) => {
    return `
🛒 NEW ORDER

Order: ${orderNumber}

Customer: ${customer}

Amount: ₦${amount.toLocaleString()}

Status: Pending
`;
  };

export const formatLowStockAlert =
  (
    productName: string,
    stock: number
  ) => {
    return `
⚠️ LOW STOCK

Product: ${productName}

Remaining Stock: ${stock}
`;
  };

export const formatOutOfStockAlert =
  (
    productName: string
  ) => {
    return `
🚨 OUT OF STOCK

Product: ${productName}
`;
  };