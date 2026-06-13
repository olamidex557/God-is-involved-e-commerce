import {
    useState,
} from "react";

import {
    uploadImage,
} from "../../../services/api/upload";

interface Props {
    value: string;
    onChange: (
        url: string
    ) => void;
}

const ImageUploader = ({
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
            const file =
                e.target.files?.[0];

            if (!file)
                return;

            try {
                setLoading(true);

                const result =
                    await uploadImage(file);

                console.log(result);

                onChange(result.url);

                onChange(
                    result.url
                );
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
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={
                    handleUpload
                }
            />

            {loading && (
                <p>
                    Uploading...
                </p>
            )}

            {value && (
                <img
                    src={value}
                    alt="Preview"
                    className="
          mt-4
          w-full
          h-48
          object-cover
          rounded-xl
          "
                />
            )}
        </div>
    );
};

export default ImageUploader;