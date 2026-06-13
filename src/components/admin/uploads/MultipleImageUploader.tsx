import { useState } from "react";

import {
  uploadImage,
} from "../../../services/api/upload";

interface Props {
  value: string[];
  onChange: (
    urls: string[]
  ) => void;
}

const MultipleImageUploader = ({
  value,
  onChange,
}: Props) => {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const files =
        Array.from(
          e.target.files || []
        );

      if (
        files.length === 0
      )
        return;

      try {
        setLoading(true);

        const urls =
          await Promise.all(
            files.map(
              async (
                file
              ) => {
                const result =
                  await uploadImage(
                    file
                  );

                return result.url;
              }
            )
          );

        onChange([
          ...value,
          ...urls,
        ]);
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

  const removeImage =
    (
      index: number
    ) => {
      onChange(
        value.filter(
          (_, i) =>
            i !== index
        )
      );
    };

  const makeFeatured =
    (
      index: number
    ) => {
      const images =
        [...value];

      const selected =
        images[index];

      images.splice(
        index,
        1
      );

      images.unshift(
        selected
      );

      onChange(images);
    };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={
          handleUpload
        }
        className="
        w-full
        p-3
        rounded-xl
        bg-white/5
        "
      />

      {loading && (
        <p
          className="
          mt-3
          text-sm
          text-[#D4AF37]
          "
        >
          Uploading...
        </p>
      )}

      <div
        className="
        grid
        grid-cols-2
        md:grid-cols-3
        gap-4
        mt-4
        "
      >
        {value.map(
          (
            image,
            index
          ) => (
            <div
              key={index}
              className="
              relative
              "
            >
              <img
                src={image}
                alt=""
                className="
                w-full
                h-40
                object-cover
                rounded-xl
                "
              />

              {index ===
                0 && (
                <div
                  className="
                  absolute
                  bottom-2
                  left-2
                  px-2
                  py-1
                  rounded-lg
                  text-xs
                  bg-green-500
                  "
                >
                  Featured
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  makeFeatured(
                    index
                  )
                }
                className="
                absolute
                top-2
                left-2
                px-2
                py-1
                rounded-lg
                text-xs
                bg-[#D4AF37]
                text-black
                "
              >
                Set Main
              </button>

              <button
                type="button"
                onClick={() =>
                  removeImage(
                    index
                  )
                }
                className="
                absolute
                top-2
                right-2
                w-8
                h-8
                rounded-full
                bg-red-500
                text-white
                "
              >
                ×
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default
  MultipleImageUploader;