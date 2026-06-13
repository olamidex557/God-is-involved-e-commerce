import { z } from "zod";

export const productSchema =
  z.object({
    name: z
      .string()
      .min(3),

    slug: z
      .string()
      .min(3),

    category: z
      .string()
      .min(2),

    description: z
      .string()
      .min(10),

    price: z
      .number()
      .positive(),

    stock: z
      .number()
      .min(0),

    images: z
      .array(z.string())
      .min(1),
  });

export type ProductFormData =
  z.infer<
    typeof productSchema
  >;