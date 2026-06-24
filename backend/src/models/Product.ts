import mongoose from "mongoose";

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

export interface ProductDocument {
  name: string;
  slug: string;
  description: string;
  category: string;
  price?: number;
  stock?: number;
  lowStockThreshold?: number;
  inStock: boolean;
  images: string[];
  featured: boolean;
  variants: ProductVariant[];
  createdAt: Date;
  updatedAt: Date;
}

const variantSizeSchema =
  new mongoose.Schema<ProductVariantSize>(
    {
      size: {
        type: String,
        required: true,
        trim: true,
      },

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      stock: {
        type: Number,
        required: true,
        min: 0,
      },

      lowStockThreshold: {
        type: Number,
        default: 10,
        min: 0,
      },
    },
    {
      _id: false,
    }
  );

const variantSchema =
  new mongoose.Schema<ProductVariant>(
    {
      color: {
        type: String,
        required: true,
        trim: true,
      },

      sizes: {
        type: [
          variantSizeSchema,
        ],
        required: true,
        validate: {
          validator: (
            sizes: ProductVariantSize[]
          ) =>
            Array.isArray(
              sizes
            ) &&
            sizes.length > 0,
          message:
            "Each color must include at least one size",
        },
      },
    },
    {
      _id: false,
    }
  );

const productSchema =
  new mongoose.Schema<ProductDocument>(
    {
      name: {
        type: String,
        required: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
      },

      description: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        min: 0,
      },

      stock: {
        type: Number,
        default: 0,
        min: 0,
      },

      lowStockThreshold: {
        type: Number,
        default: 10,
        min: 0,
      },

      inStock: {
        type: Boolean,
        default: true,
      },

      images: {
        type: [String],
        default: [],
      },

      featured: {
        type: Boolean,
        default: false,
      },

      variants: {
        type: [
          variantSchema,
        ],
        default: [],
        validate: {
          validator: (
            variants: ProductVariant[]
          ) =>
            Array.isArray(
              variants
            ) &&
            variants.length > 0,
          message:
            "At least one variant is required",
        },
      },
    },
    {
      timestamps: true,
    }
  );

const normalizeProductVariants =
  (
    product: ProductDocument
  ) => {
    if (
      Array.isArray(
        product.variants
      ) &&
      product.variants.length > 0
    ) {
      return;
    }

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
  };

const syncProductSummary =
  (
    product: ProductDocument
  ) => {
    normalizeProductVariants(
      product
    );

    const sizes =
      product.variants.flatMap(
        (
          variant
        ) => variant.sizes
      );

    const firstSize =
      sizes[0];

    product.price =
      firstSize?.price ?? 0;

    product.stock =
      sizes.reduce(
        (
          total,
          size
        ) =>
          total + size.stock,
        0
      );

    product.lowStockThreshold =
      firstSize?.lowStockThreshold ??
      10;

    product.inStock =
      product.stock > 0;
  };

productSchema.pre(
  "validate",
  function normalizeVariants() {
    syncProductSummary(
      this as ProductDocument
    );
  }
);

productSchema.pre(
  "save",
  function syncSummary() {
    syncProductSummary(
      this as ProductDocument
    );
  }
);

productSchema.index({
  category: 1,
});

productSchema.index({
  "variants.color": 1,
  "variants.sizes.size": 1,
});

productSchema.index({
  "variants.sizes.stock": 1,
});

export default mongoose.model(
  "Product",
  productSchema
);
