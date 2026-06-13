interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateProductModal = ({
  open,
  onClose,
}: Props) => {
  if (!open) return null;

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
      z-[100]
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

        <div className="space-y-4">
          <input
            placeholder="Product Name"
            className="
            w-full
            p-4
            rounded-xl
            bg-white/5
            "
          />

          <input
            placeholder="Category"
            className="
            w-full
            p-4
            rounded-xl
            bg-white/5
            "
          />

          <input
            placeholder="Price"
            className="
            w-full
            p-4
            rounded-xl
            bg-white/5
            "
          />

          <textarea
            rows={5}
            placeholder="Description"
            className="
            w-full
            p-4
            rounded-xl
            bg-white/5
            "
          />

          <button
            className="
            w-full
            py-4
            rounded-xl
            bg-[#D4AF37]
            text-black
            font-semibold
            "
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;