const ProductFilters = () => {
  return (
    <div
      className="
      flex
      flex-wrap
      gap-3
      "
    >
      <button
        className="
        px-4
        py-2
        rounded-xl
        bg-[#D4AF37]
        text-black
        "
      >
        All
      </button>

      <button
        className="
        px-4
        py-2
        rounded-xl
        bg-white/5
        "
      >
        Boards
      </button>

      <button
        className="
        px-4
        py-2
        rounded-xl
        bg-white/5
        "
      >
        Veneers
      </button>

      <button
        className="
        px-4
        py-2
        rounded-xl
        bg-white/5
        "
      >
        Accessories
      </button>
    </div>
  );
};

export default ProductFilters;