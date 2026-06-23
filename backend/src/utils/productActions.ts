export interface StockAdjustmentCommand {
  productName: string;
  amount: number;
}

export const parseRestockCommand =
  (
    text: string
  ): StockAdjustmentCommand | null => {
    const match =
      text
        .trim()
        .match(
          /^restock\s+(.+)\s+by\s+(\d+)$/i
        );

    if (!match) {
      return null;
    }

    return {
      productName:
        match[1],
      amount:
        Number(
          match[2]
        ),
    };
  };

export const parseSetStockCommand =
  (
    text: string
  ): StockAdjustmentCommand | null => {
    const match =
      text
        .trim()
        .match(
          /^set\s+(.+)\s+stock\s+to\s+(\d+)$/i
        );

    if (!match) {
      return null;
    }

    return {
      productName:
        match[1],
      amount:
        Number(
          match[2]
        ),
    };
  };
