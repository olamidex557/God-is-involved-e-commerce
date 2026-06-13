interface Props {
  title: string;
  description: string;
}

const SettingsSection = ({
  title,
  description,
}: Props) => {
  return (
    <div
      className="
      bg-white/[0.03]
      border
      border-white/10
      rounded-3xl
      p-6
      hover:border-[#D4AF37]
      transition
      "
    >
      <h3
        className="
        text-xl
        font-semibold
        "
      >
        {title}
      </h3>

      <p
        className="
        text-white/50
        mt-3
        "
      >
        {description}
      </p>

      <button
        className="
        mt-6
        px-5
        py-3
        rounded-xl
        bg-[#D4AF37]
        text-black
        font-medium
        "
      >
        Configure
      </button>
    </div>
  );
};

export default SettingsSection;