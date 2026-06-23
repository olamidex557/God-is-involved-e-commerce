export interface Product {
  _id: string;

  id: string;

  name: string;

  slug?: string;

  category: string;

  price: number;

  description: string;

  images: string[];

  colors?: string[];

  sizes?: string[];

  thicknesses?: string[];

  stock?: number;

  lowStockThreshold?: number;

  inStock?: boolean;
}

export type ProductPayload =
  Partial<
    Omit<
      Product,
      "_id" | "id"
    >
  >;
