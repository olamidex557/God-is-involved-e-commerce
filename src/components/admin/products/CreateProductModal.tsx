import { useState } from "react";

import {
  createProduct,
} from "../../../services/api/adminProducts";

import MultipleImageUploader
  from "../uploads/MultipleImageUploader";
import VariantBuilder
  from "./VariantBuilder";
import type {
  ProductVariant,
} from "../../../types/product";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
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

const CreateProductModal = ({
  open,
  onClose,
  onCreated,
}: Props) => {
  const defaultVariants:
    ProductVariant[] = [
      {
        color: "Default",
        sizes: [
          {
            size: "Standard",
            price: 0,
            stock: 0,
            lowStockThreshold: 10,
          },
        ],
      },
    ];

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [form, setForm] =
    useState({
      name: "",
      slug: "",
      description: "",
      category: "",
      images: [] as string[],
      variants:
        defaultVariants,
    });

  const [error, setError] =
    useState("");

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm((previous) => {
      const next = {
        ...previous,
        [e.target.name]:
          e.target.value,
      };

      if (
        e.target.name ===
          "name" &&
        previous.slug.trim() === ""
      ) {
        next.slug =
          slugify(
            e.target.value
          );
      }

      return next;
    });
  };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();
      setError("");

      try {
        setLoading(true);

        if (
          form.images.length ===
          0
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

        await createProduct({
          ...form,
          slug:
            form.slug.trim() ||
            slugify(
              form.name
            ),
          variants:
            form.variants,
          images:
            form.images,
        });

        onCreated();

        onClose();

        setForm({
          name: "",
          slug: "",
          description: "",
          category: "",
          images: [],
          variants:
            defaultVariants,
        });
      } catch (
      error
      ) {
          console.error(
          error
        );
        setError(
          "Product could not be created. Check the details and try again."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/70
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
      "
    >
      <div
        className="
        w-full
        max-w-4xl
        max-h-[90vh]
        overflow-y-auto
        bg-[#111]
        border
        border-white/10
        rounded-3xl
        p-8
        "
      >
        <div
          className="
          flex
          justify-between
          mb-6
          "
        >
          <h2
            className="
            text-2xl
            font-bold
            "
          >
            New Product
          </h2>

          <button
            onClick={onClose}
          >
            x
          </button>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="
          space-y-4
          "
        >
          <input
            name="name"
            placeholder="Name"
            value={
              form.name
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/5
            "
          />

          <input
            name="slug"
            placeholder="Slug"
            value={
              form.slug
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/5
            "
          />

          <input
            name="category"
            placeholder="Category"
            value={
              form.category
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/5
            "
          />

          <VariantBuilder
            variants={
              form.variants
            }
            onChange={(
              variants
            ) =>
              setForm(
                (
                  prev
                ) => ({
                  ...prev,
                  variants,
                })
              )
            }
          />

          <MultipleImageUploader
            value={form.images}
            onChange={(
              urls: string[]
            ) =>
              setForm(
                (
                  prev
                ) => ({
                  ...prev,
                  images:
                    urls,
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
            className="
            w-full
            p-4
            rounded-xl
            bg-white/5
            "
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
              !form.name ||
              !form.category ||
              !form.description ||
              form.variants
                .length === 0 ||
              form.images
                .length === 0
            }
            className="
  w-full
  py-4
  rounded-xl
  bg-[#D4AF37]
  text-black
  font-semibold
  disabled:opacity-50
  "
          >
            {loading
              ? "Creating..."
              : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
