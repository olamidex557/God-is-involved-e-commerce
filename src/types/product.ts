export interface ProductVariantSize {
  size: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
}

export interface ProductVariant {
  color: string;
  sizes: ProductVariantSize[];
}

export interface Product {
  _id: string;
  id?: string;
  name: string;
  slug?: string;
  category: string;
  description: string;
  images: string[];
  variants?: ProductVariant[];
  price: number;
  stock: number;
  lowStockThreshold: number;
  inStock: boolean;
  featured?: boolean;
  colors?: string[];
  sizes?: string[];
  thicknesses?: string[];
}

export type ProductPayload =
  Partial<
    Omit<
      Product,
      "_id" | "id"
    >
  >;

export const getProductVariants =
  (
    product: Product
  ): ProductVariant[] => {
    if (
      product.variants &&
      product.variants.length > 0
    ) {
      return product.variants;
    }

    return [
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
  };

export const getProductVariantSizes =
  (
    product: Product
  ) =>
    getProductVariants(
      product
    ).flatMap(
      (
        variant
      ) =>
        variant.sizes.map(
          (
            size
          ) => ({
            ...size,
            color:
              variant.color,
          })
        )
    );

export const getProductStartingPrice =
  (
    product: Product
  ) =>
    Math.min(
      ...getProductVariantSizes(
        product
      ).map(
        (
          size
        ) => size.price
      )
    );

export const getProductTotalStock =
  (
    product: Product
  ) =>
    getProductVariantSizes(
      product
    ).reduce(
      (
        total,
        size
      ) =>
        total + size.stock,
      0
    );
