export type BotIntent =
  | "pending"
  | "revenue"
  | "stock"
  | "summary"
  | "today"
  | "low-stock"
  | "out-of-stock"
  | "top-products"
  | "unknown";

export const detectIntent =
  (
    text: string
  ): BotIntent => {
    const message =
      text.toLowerCase();

    if (
      message.includes(
        "pending"
      )
    ) {
      return "pending";
    }

    if (
      message.includes(
        "revenue"
      ) ||
      message.includes(
        "sales"
      ) ||
      message.includes(
        "income"
      )
    ) {
      return "revenue";
    }

    if (
      message.includes(
        "summary"
      ) ||
      message.includes(
        "overview"
      )
    ) {
      return "summary";
    }

    if (
      message.includes(
        "today"
      )
    ) {
      return "today";
    }

    if (
      message.includes(
        "out of stock"
      )
    ) {
      return "out-of-stock";
    }

    if (
      message.includes(
        "restock"
      ) ||
      message.includes(
        "low stock"
      )
    ) {
      return "low-stock";
    }

    if (
      message.includes(
        "stock"
      ) ||
      message.includes(
        "inventory"
      )
    ) {
      return "stock";
    }

    if (
      message.includes(
        "top"
      ) ||
      message.includes(
        "best selling"
      )
    ) {
      return "top-products";
    }

    return "unknown";
  };
