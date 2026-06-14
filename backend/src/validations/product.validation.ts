import { z } from "zod";

const requiredString = (
  field: string
) =>
  z
    .string({
      error: `${field} is required`,
    })
    .trim()
    .min(1, {
      error: `${field} is required`,
    });

const numericValue = (
  field: string
) =>
  z.coerce.number({
    error: `${field} must be a number`,
  });

export const productSchema =
  z.object({
    name:
      requiredString(
        "name"
      ),
    slug:
      requiredString(
        "slug"
      ),
    description:
      requiredString(
        "description"
      ),
    category:
      requiredString(
        "category"
      ),
    price:
      numericValue(
        "price"
      ).positive({
        error:
          "price must be a positive number",
      }),
    stock:
      numericValue(
        "stock"
      ).min(0, {
        error:
          "stock must be a non-negative number",
      }),
    images:
      z
        .array(
          requiredString(
            "image"
          ),
          {
            error:
              "images must be an array",
          }
        )
        .min(1, {
          error:
            "images must contain at least one image",
        }),
    featured:
      z.boolean().optional(),
  });
