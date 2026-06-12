import { useState } from "react";

import toast from "react-hot-toast";

import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";

import { api } from "../../../services/api/client";

import { useAdminProducts } from "../../../hooks/useAdminProducts";

const ProductsAdmin = () => {
  const {
    products,
    loading,
    fetchProducts,
  } = useAdminProducts();

  const [form, setForm] =
    useState({
      name: "",
      slug: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await api.post(
          "/products",
          {
            name: form.name,
            slug: form.slug,
            description:
              form.description,
            category:
              form.category,
            price:
              Number(
                form.price
              ),
            stock:
              Number(
                form.stock
              ),
            images: [
              form.image,
            ],
          }
        );

        toast.success(
          "Product Created"
        );

        fetchProducts();

        setForm({
          name: "",
          slug: "",
          description: "",
          category: "",
          price: "",
          stock: "",
          image: "",
        });
      } catch {
        toast.error(
          "Failed"
        );
      }
    };

  const deleteProduct =
    async (
      id: string
    ) => {
      try {
        await api.delete(
          `/products/${id}`
        );

        toast.success(
          "Deleted"
        );

        fetchProducts();
      } catch {
        toast.error(
          "Delete Failed"
        );
      }
    };

  return (
    <div className="pt-32 pb-32">
      <Container>
        <h1 className="text-5xl font-bold mb-10">
          Products
        </h1>

        {/* CREATE */}

        <form
          onSubmit={
            handleSubmit
          }
          className="
          grid
          md:grid-cols-2
          gap-4
          mb-16
          "
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
            className="
            bg-zinc-900
            p-4
            rounded-xl
            "
          />

          <input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) =>
              setForm({
                ...form,
                slug:
                  e.target.value,
              })
            }
            className="
            bg-zinc-900
            p-4
            rounded-xl
            "
          />

          <input
            placeholder="Category"
            value={
              form.category
            }
            onChange={(e) =>
              setForm({
                ...form,
                category:
                  e.target.value,
              })
            }
            className="
            bg-zinc-900
            p-4
            rounded-xl
            "
          />

          <input
            placeholder="Price"
            value={
              form.price
            }
            onChange={(e) =>
              setForm({
                ...form,
                price:
                  e.target.value,
              })
            }
            className="
            bg-zinc-900
            p-4
            rounded-xl
            "
          />

          <input
            placeholder="Stock"
            value={
              form.stock
            }
            onChange={(e) =>
              setForm({
                ...form,
                stock:
                  e.target.value,
              })
            }
            className="
            bg-zinc-900
            p-4
            rounded-xl
            "
          />

          <input
            placeholder="Image URL"
            value={
              form.image
            }
            onChange={(e) =>
              setForm({
                ...form,
                image:
                  e.target.value,
              })
            }
            className="
            bg-zinc-900
            p-4
            rounded-xl
            "
          />

          <textarea
            placeholder="Description"
            value={
              form.description
            }
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
            className="
            md:col-span-2
            bg-zinc-900
            p-4
            rounded-xl
            "
          />

          <Button>
            Create Product
          </Button>
        </form>

        {/* TABLE */}

        <div
          className="
          border
          border-white/10
          rounded-3xl
          overflow-hidden
          "
        >
          {loading ? (
            <div className="p-8">
              Loading...
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-900">
                  <th className="p-4">
                    Product
                  </th>

                  <th className="p-4">
                    Price
                  </th>

                  <th className="p-4">
                    Stock
                  </th>

                  <th className="p-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map(
                  (
                    product
                  ) => (
                    <tr
                      key={
                        product._id
                      }
                    >
                      <td className="p-4">
                        {
                          product.name
                        }
                      </td>

                      <td className="p-4">
                        ₦
                        {product.price.toLocaleString()}
                      </td>

                      <td className="p-4">
                        {
                          product.stock
                        }
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() =>
                            deleteProduct(
                              product._id
                            )
                          }
                          className="
                          text-red-500
                          "
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductsAdmin;