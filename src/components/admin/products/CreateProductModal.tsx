import { useState } from "react";

import { createProduct, } from "../../../services/api/adminProducts";
import ImageUploader from "../uploads/ImageUploader";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const CreateProductModal = ({
  open,
  onClose,
  onCreated,
}: Props) => {
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
      price: "",
      stock: "",
      images: "",
    });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        console.log("FORM:", form);

        await createProduct({
          ...form,
          price:
            Number(
              form.price
            ),
          stock:
            Number(
              form.stock
            ),
          images: [
            form.images,
          ],
        });

        onCreated();

        onClose();

        setForm({
          name: "",
          slug: "",
          description: "",
          category: "",
          price: "",
          stock: "",
          images: "",
        });
      } catch (
      error
      ) {
        console.error(
          error
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
        max-w-2xl
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
            ✕
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

          <input
            name="price"
            placeholder="Price"
            value={
              form.price
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
            name="stock"
            placeholder="Stock"
            value={
              form.stock
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

          <ImageUploader
            value={form.images}
            onChange={(url: string) => {
              console.log("URL RECEIVED:", url);

              setForm({
                ...form,
                images: url,
              });
            }
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

          <button
            type="submit"
            disabled={
              loading
            }
            className="
            w-full
            py-4
            rounded-xl
            bg-[#D4AF37]
            text-black
            font-semibold
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