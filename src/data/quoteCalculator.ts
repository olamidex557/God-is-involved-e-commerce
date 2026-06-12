export interface QuoteResult {
  boards: number;
  hinges: number;
  handles: number;
  rails: number;

  prices: {
    boardPrice: number;
    hingePrice: number;
    handlePrice: number;
    railPrice: number;
  };

  totals: {
    boardsTotal: number;
    hingesTotal: number;
    handlesTotal: number;
    railsTotal: number;
  };

  estimatedCost: number;
}

export const calculateWardrobeQuote = (
  width: number,
  height: number
): QuoteResult => {
  const area =
    (width * height) / 1000000;

  const boards = Math.max(
    2,
    Math.ceil(area / 0.7)
  );

  const hinges =
    boards * 2;

  const handles =
    Math.ceil(
      boards * 1.5
    );

  const rails =
    Math.max(
      1,
      Math.ceil(
        boards / 3
      )
    );

  const boardPrice = 25000;

  const hingePrice = 1200;

  const handlePrice = 3500;

  const railPrice = 5000;

  const boardsTotal =
    boards * boardPrice;

  const hingesTotal =
    hinges * hingePrice;

  const handlesTotal =
    handles * handlePrice;

  const railsTotal =
    rails * railPrice;

  const estimatedCost =
    boardsTotal +
    hingesTotal +
    handlesTotal +
    railsTotal;

  return {
    boards,
    hinges,
    handles,
    rails,

    prices: {
      boardPrice,
      hingePrice,
      handlePrice,
      railPrice,
    },

    totals: {
      boardsTotal,
      hingesTotal,
      handlesTotal,
      railsTotal,
    },

    estimatedCost,
  };
};