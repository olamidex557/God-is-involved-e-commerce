interface Props {
  onCreate: () => void;
}

const ProductToolbar = ({
  onCreate,
}: Props) => {
  return (
    <div
      className="
      flex
      flex-col
      md:flex-row
      gap-4
      justify-between
      items-center
      "
    >
      <input
        placeholder="Search products..."
        className="
        bg-white/5
        border
        border-white/10
        rounded-2xl
        px-5
        py-3
        w-full
        md:w-96
        "
      />

      <button
        onClick={onCreate}
        className="
        px-5
        py-3
        rounded-2xl
        bg-[#D4AF37]
        text-black
        font-medium
        "
      >
        New Product
      </button>
    </div>
  );
};

export default ProductToolbar;