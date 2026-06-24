import type {
  ProductDocument,
  ProductVariant,
  ProductVariantSize,
} from "../models/Product";

export interface InventoryItem {
  productId: string;
  productName: string;
  category: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
}

export const getCompatibleVariants =
  (
    product: ProductDocument
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

export const getVariantSizes =
  (
    product: ProductDocument
  ): InventoryItem[] =>
    getCompatibleVariants(
      product
    ).flatMap(
      (
        variant
      ) =>
        variant.sizes.map(
          (
            size: ProductVariantSize
          ) => ({
            productId:
              (
                product as unknown as {
                  _id: {
                    toString: () => string;
                  };
                }
              )._id.toString(),
            productName:
              product.name,
            category:
              product.category,
            color:
              variant.color,
            size:
              size.size,
            price:
              size.price,
            stock:
              size.stock,
            lowStockThreshold:
              size.lowStockThreshold,
          })
        )
    );

export const getInventoryItems =
  (
    products: ProductDocument[]
  ): InventoryItem[] =>
    products.flatMap(
      (
        product
      ) =>
        getVariantSizes(
          product
        )
    );
