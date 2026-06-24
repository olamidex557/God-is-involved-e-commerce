import {
  useEffect,
  useState,
} from "react";

import {
  updateProduct,
} from "../../../services/api/adminProducts";
import type {
  Product,
  ProductVariant,
} from "../../../types/product";
import {
  getProductVariants,
} from "../../../types/product";
import MultipleImageUploader
  from "../uploads/MultipleImageUploader";
import VariantBuilder
  from "./VariantBuilder";

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const validateVariants = (
  variants: ProductVariant[]
) => {
  if (variants.length === 0) {
    return "Add at least one color.";
  }

  const colors = new Set<string>();

  for (const variant of variants) {
    const color =
      variant.color.trim();

    if (!color) {
      return "Every color must have a name.";
    }

    const colorKey =
      color.toLowerCase();

    if (colors.has(colorKey)) {
      return "Duplicate colors are not allowed.";
    }

    colors.add(colorKey);

    if (variant.sizes.length === 0) {
      return `${color} must include at least one size.`;
    }

    const sizes = new Set<string>();

    for (const size of variant.sizes) {
      const label =
        size.size.trim();

      if (!label) {
        return `Every size under ${color} must have a name.`;
      }

      const sizeKey =
        label.toLowerCase();

      if (sizes.has(sizeKey)) {
        return `Duplicate sizes are not allowed under ${color}.`;
      }

      sizes.add(sizeKey);

      if (
        size.price < 0 ||
        size.stock < 0 ||
        size.lowStockThreshold < 0
      ) {
        return "Price, stock and threshold must be zero or greater.";
      }
    }
  }

  return "";
};

const EditProductModal = ({
  product,
  open,
  onClose,
  onUpdated,
}: Props) => {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    form,
    setForm,
  ] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    images: [] as string[],
    variants: [] as ProductVariant[],
  });

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!product) {
      return;
    }

    setForm({
      name:
        product.name,
      slug:
        product.slug ?? "",
      description:
        product.description,
      category:
        product.category,
      images:
        product.images ?? [],
      variants:
        getProductVariants(
          product
        ),
    });
  }, [product]);

  if (
    !open ||
    !product
  ) {
    return null;
  }

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm((previous) => {
      const next = {
        ...previous,
        [event.target.name]:
          event.target.value,
      };

      if (
        event.target.name ===
          "name" &&
        previous.slug.trim() === ""
      ) {
        next.slug =
          slugify(
            event.target.value
          );
      }

      return next;
    });
  };

  const handleSubmit =
    async (
      event: React.FormEvent
    ) => {
      event.preventDefault();
      setError("");

      try {
        setLoading(true);

        if (
          form.images.length === 0
        ) {
          setError(
            "Upload at least one image."
          );

          return;
        }

        const variantError =
          validateVariants(
            form.variants
          );

        if (variantError) {
          setError(
            variantError
          );

          return;
        }

        await updateProduct(
          product._id,
          {
            ...form,
            slug:
              form.slug.trim() ||
              slugify(
                form.name
              ),
            variants:
              form.variants,
          }
        );

        onUpdated();
        onClose();
      } catch (
      error
      ) {
        console.error(
          error
        );
        setError(
          "Product could not be saved. Check the details and try again."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-[#111] p-8">
        <div className="mb-6 flex justify-between">
          <h2 className="text-2xl font-bold">
            Edit Product
          </h2>

          <button onClick={onClose}>
            x
          </button>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          {[
            [
              "name",
              "Name",
            ],
            [
              "slug",
              "Slug",
            ],
            [
              "category",
              "Category",
            ],
          ].map(
            (
              [
                name,
                label,
              ]
            ) => (
              <input
                key={name}
                name={name}
                placeholder={label}
                value={
                  form[
                    name as keyof typeof form
                  ] as string
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl bg-white/5 p-4 outline-none"
              />
            )
          )}

          <VariantBuilder
            variants={
              form.variants
            }
            onChange={(
              variants
            ) =>
              setForm(
                (
                  previous
                ) => ({
                  ...previous,
                  variants,
                })
              )
            }
          />

          <MultipleImageUploader
            value={form.images}
            onChange={(
              images
            ) =>
              setForm(
                (
                  previous
                ) => ({
                  ...previous,
                  images,
                })
              )
            }
          />

          <textarea
            name="description"
            rows={4}
            placeholder="Description"
            value={
              form.description
            }
            onChange={
              handleChange
            }
            className="w-full rounded-xl bg-white/5 p-4 outline-none"
          />

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={
              loading ||
              form.variants.length ===
                0 ||
              form.images.length ===
                0
            }
            className="w-full rounded-xl bg-[#D4AF37] py-4 font-semibold text-black disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
