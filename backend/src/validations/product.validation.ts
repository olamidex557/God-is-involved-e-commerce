import { z } from "zod";

const requiredString = (field: string) =>
  z
    .string({
      error: `${field} is required`,
    })
    .trim()
    .min(1, {
      error: `${field} is required`,
    });

const optionalString = () =>
  z.string().trim().optional();

const numericValue = (field: string) =>
  z.coerce.number({
    error: `${field} must be a number`,
  });

const variantSizeSchema = z.object({
  size: requiredString("size"),
  price: numericValue("price").min(0, {
    error:
      "price must be a non-negative number",
  }),
  stock: numericValue("stock").min(0, {
    error:
      "stock must be a non-negative number",
  }),
  lowStockThreshold: numericValue(
    "lowStockThreshold"
  ).min(0, {
    error:
      "low stock threshold must be non-negative",
  }),
});

const variantsSchema = z
  .array(
    z.object({
      color: requiredString("color"),
      sizes: z
        .array(variantSizeSchema)
        .min(1, {
          error:
            "each color must include at least one size",
        }),
    })
  )
  .min(1, {
    error:
      "at least one variant is required",
  });

const imageSchema = z
  .array(requiredString("image"), {
    error:
      "images must be an array",
  })
  .min(1, {
    error:
      "images must contain at least one image",
  });

const productBaseSchema = z.object({
  name: requiredString("name"),
  slug: optionalString(),
  description:
    requiredString("description"),
  category: requiredString("category"),
  price: numericValue("price")
    .min(0, {
      error:
        "price must be a non-negative number",
    })
    .optional(),
  stock: numericValue("stock")
    .min(0, {
      error:
        "stock must be a non-negative number",
    })
    .optional(),
  lowStockThreshold:
    numericValue("lowStockThreshold")
      .min(0, {
        error:
          "low stock threshold must be non-negative",
      })
      .optional(),
  variants: variantsSchema.optional(),
  images: imageSchema,
  featured: z.boolean().optional(),
});

const validateVariants = (
  value: {
    variants?: z.infer<
      typeof variantsSchema
    >;
    price?: number;
    stock?: number;
  },
  context: z.RefinementCtx
) => {
  if (
    !value.variants &&
    (value.price === undefined ||
      value.stock === undefined)
  ) {
    context.addIssue({
      code: "custom",
      path: [
        "variants",
      ],
      message:
        "variants are required",
    });
  }

  const colors = new Set<string>();

  value.variants?.forEach(
    (variant, variantIndex) => {
      const colorKey =
        variant.color
          .trim()
          .toLowerCase();

      if (colors.has(colorKey)) {
        context.addIssue({
          code: "custom",
          path: [
            "variants",
            variantIndex,
            "color",
          ],
          message:
            "duplicate colors are not allowed",
        });
      }

      colors.add(colorKey);

      const sizes =
        new Set<string>();

      variant.sizes.forEach(
        (size, sizeIndex) => {
          const sizeKey =
            size.size
              .trim()
              .toLowerCase();

          if (sizes.has(sizeKey)) {
            context.addIssue({
              code: "custom",
              path: [
                "variants",
                variantIndex,
                "sizes",
                sizeIndex,
                "size",
              ],
              message:
                "duplicate sizes are not allowed within a color",
            });
          }

          sizes.add(sizeKey);
        }
      );
    }
  );
};

export const productSchema =
  productBaseSchema.superRefine(
    validateVariants
  );

export const productUpdateSchema =
  productBaseSchema
    .partial()
    .superRefine(
      (
        value,
        context
      ) => {
        if (
          value.variants &&
          value.variants.length === 0
        ) {
          context.addIssue({
            code: "custom",
            path: [
              "variants",
            ],
            message:
              "at least one variant is required",
          });
        }

        if (value.variants) {
          validateVariants(
            {
              ...value,
              variants:
                value.variants,
              price: 0,
              stock: 0,
            },
            context
          );
        }
      }
    );
