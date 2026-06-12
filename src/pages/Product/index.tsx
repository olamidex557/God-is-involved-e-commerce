import {
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Container from "../../components/ui/Container";

import Button from "../../components/ui/Button";

import {
  useProduct,
} from "../../hooks/useProduct";

import {
  useCartStore,
} from "../../store/cartStore";

const Product = () => {
  const { id } =
    useParams();

  const {
    product,
    loading,
  } = useProduct(
    id as string
  );

  const addToCart =
    useCartStore(
      (state) =>
        state.addItem
    );

  const [
    activeImage,
    setActiveImage,
  ] = useState(0);

  if (loading) {
    return (
      <div className="pt-32 text-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 text-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32">
      <Container>
        <div
          className="
          grid
          lg:grid-cols-2
          gap-12
          "
        >
          {/* GALLERY */}

          <div>
            <div
              className="
              overflow-hidden
              rounded-[40px]
              border
              border-white/10
              "
            >
              <img
                src={
                  product.images?.[
                    activeImage
                  ] ||
                  "https://picsum.photos/1000"
                }
                alt={
                  product.name
                }
                className="
                w-full
                h-[600px]
                object-cover
                hover:scale-110
                transition
                duration-700
                "
              />
            </div>

            <div
              className="
              flex
              gap-4
              mt-4
              overflow-x-auto
              "
            >
              {product.images?.map(
                (
                  image: string,
                  index: number
                ) => (
                  <button
                    key={index}
                    onClick={() =>
                      setActiveImage(
                        index
                      )
                    }
                    className={`
                      w-24
                      h-24
                      rounded-xl
                      overflow-hidden
                      border
                      ${
                        activeImage ===
                        index
                          ? "border-[#D4AF37]"
                          : "border-white/10"
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt=""
                      className="
                      w-full
                      h-full
                      object-cover
                      "
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* INFO */}

          <div>
            <p
              className="
              text-[#D4AF37]
              uppercase
              tracking-[0.2em]
              "
            >
              {
                product.category
              }
            </p>

            <h1
              className="
              text-5xl
              font-bold
              mt-4
              "
            >
              {product.name}
            </h1>

            <p
              className="
              text-4xl
              font-bold
              mt-6
              "
            >
              ₦
              {product.price.toLocaleString()}
            </p>

            <p
              className="
              text-white/60
              mt-8
              leading-relaxed
              "
            >
              {
                product.description
              }
            </p>

            <div
              className="
              mt-8
              "
            >
              <span
                className="
                text-green-500
                "
              >
                In Stock
              </span>

              {" • "}

              <span>
                {
                  product.stock
                }{" "}
                available
              </span>
            </div>

            <div
              className="
              mt-10
              "
            >
              <Button
                onClick={() =>
                  addToCart({
                    id: product._id,
                    name:
                      product.name,
                    price:
                      product.price,
                    image:
                      product
                        .images?.[0],
                    quantity: 1,
                  })
                }
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;