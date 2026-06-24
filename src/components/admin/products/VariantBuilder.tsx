import type {
  ProductVariant,
} from "../../../types/product";

interface VariantBuilderProps {
  variants: ProductVariant[];
  onChange: (
    variants: ProductVariant[]
  ) => void;
}

const emptySize = () => ({
  size: "",
  price: 0,
  stock: 0,
  lowStockThreshold: 10,
});

const getStockLabel = (
  stock: number,
  threshold: number
) => {
  if (stock <= 0) {
    return {
      label: "Out",
      className:
        "border-red-500/30 bg-red-500/10 text-red-200",
    };
  }

  if (stock <= threshold) {
    return {
      label: "Low",
      className:
        "border-amber-500/30 bg-amber-500/10 text-amber-200",
    };
  }

  return {
    label: "In stock",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  };
};

const VariantBuilder = ({
  variants,
  onChange,
}: VariantBuilderProps) => {
  const updateVariant =
    (
      index: number,
      variant: ProductVariant
    ) => {
      onChange(
        variants.map(
          (
            item,
            itemIndex
          ) =>
            itemIndex === index
              ? variant
              : item
        )
      );
    };

  const totalStock =
    variants.reduce(
      (
        total,
        variant
      ) =>
        total +
        variant.sizes.reduce(
          (
            sum,
            size
          ) =>
            sum + size.stock,
          0
        ),
      0
    );

  const totalSizes =
    variants.reduce(
      (
        total,
        variant
      ) =>
        total +
        variant.sizes.length,
      0
    );

  const duplicateColors =
    variants
      .map((variant) =>
        variant.color
          .trim()
          .toLowerCase()
      )
      .filter(Boolean)
      .filter(
        (
          color,
          index,
          colors
        ) =>
          colors.indexOf(color) !==
          index
      );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            Variants
          </h3>

          <p className="text-sm text-white/45">
            Add colors, sizes, prices and stock levels.
          </p>

          <p className="mt-1 text-xs text-white/40">
            {variants.length} colors, {totalSizes} sizes, {totalStock} units total
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange([
              ...variants,
              {
                color: "",
                sizes: [
                  emptySize(),
                ],
              },
            ])
          }
          className="rounded-full bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black"
        >
          Add Color
        </button>
      </div>

      {variants.map(
        (
          variant,
          variantIndex
        ) => (
          <div
            key={variantIndex}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            {duplicateColors.includes(
              variant.color
                .trim()
                .toLowerCase()
            ) && (
              <div className="mb-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                Duplicate color name.
              </div>
            )}

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <input
                value={variant.color}
                onChange={(
                  event
                ) =>
                  updateVariant(
                    variantIndex,
                    {
                      ...variant,
                      color:
                        event.target.value,
                    }
                  )
                }
                placeholder="Color"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#D4AF37]/70"
              />

              <button
                type="button"
                onClick={() =>
                  onChange(
                    variants.filter(
                      (
                        _,
                        index
                      ) =>
                        index !==
                        variantIndex
                    )
                  )
                }
                disabled={
                  variants.length ===
                  1
                }
                className="rounded-xl border border-red-500/30 px-4 py-3 text-sm text-red-300"
              >
                Delete Color
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {variant.sizes.map(
                (
                  size,
                  sizeIndex
                ) => (
                  <div key={sizeIndex}>
                    {variant.sizes
                      .map((item) =>
                        item.size
                          .trim()
                          .toLowerCase()
                      )
                      .filter(Boolean)
                      .filter(
                        (
                          label,
                          index,
                          labels
                        ) =>
                          labels.indexOf(
                            label
                          ) !== index
                      )
                      .includes(
                        size.size
                          .trim()
                          .toLowerCase()
                      ) && (
                      <div className="mb-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                        Duplicate size for this color.
                      </div>
                    )}

                    <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto_auto]">
                    <input
                      value={size.size}
                      onChange={(
                        event
                      ) => {
                        const nextSizes =
                          variant.sizes.map(
                            (
                              item,
                              index
                            ) =>
                              index ===
                              sizeIndex
                                ? {
                                    ...item,
                                    size:
                                      event
                                        .target
                                        .value,
                                  }
                                : item
                          );

                        updateVariant(
                          variantIndex,
                          {
                            ...variant,
                            sizes:
                              nextSizes,
                          }
                        );
                      }}
                      placeholder="Size e.g. 4x8"
                      className="min-w-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#D4AF37]/70"
                    />

                    {[
                      [
                        "price",
                        "Price",
                      ],
                      [
                        "stock",
                        "Stock",
                      ],
                      [
                        "lowStockThreshold",
                        "Threshold",
                      ],
                    ].map(
                      (
                        [
                          field,
                          label,
                        ]
                      ) => (
                        <input
                          key={field}
                          type="number"
                          min={0}
                          value={
                            size[
                              field as keyof typeof size
                            ]
                          }
                          onChange={(
                            event
                          ) => {
                            const nextSizes =
                              variant.sizes.map(
                                (
                                  item,
                                  index
                                ) =>
                                  index ===
                                  sizeIndex
                                    ? {
                                        ...item,
                                        [field]:
                                          Number(
                                            event
                                              .target
                                              .value
                                          ),
                                      }
                                    : item
                              );

                            updateVariant(
                              variantIndex,
                              {
                                ...variant,
                                sizes:
                                  nextSizes,
                              }
                            );
                          }}
                          placeholder={label}
                          className="min-w-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#D4AF37]/70"
                        />
                      )
                    )}

                    {(() => {
                      const stockState =
                        getStockLabel(
                          size.stock,
                          size.lowStockThreshold
                        );

                      return (
                        <div
                          className={`flex h-12 items-center justify-center rounded-xl border px-3 text-xs font-semibold ${stockState.className}`}
                        >
                          {stockState.label}
                        </div>
                      );
                    })()}

                    <button
                      type="button"
                      onClick={() =>
                        updateVariant(
                          variantIndex,
                          {
                            ...variant,
                            sizes:
                              variant.sizes.filter(
                                (
                                  _,
                                  index
                                ) =>
                                  index !==
                                  sizeIndex
                              ),
                          }
                        )
                      }
                      disabled={
                        variant.sizes
                          .length === 1
                      }
                      className="rounded-xl border border-red-500/30 px-4 py-3 text-sm text-red-300"
                    >
                      Delete
                    </button>
                    </div>
                  </div>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                updateVariant(
                  variantIndex,
                  {
                    ...variant,
                    sizes: [
                      ...variant.sizes,
                      emptySize(),
                    ],
                  }
                )
              }
              className="mt-4 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
            >
              Add Size
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default VariantBuilder;
