interface Props {
  title: string;
  children: React.ReactNode;
}

const WorkspaceCard = ({
  title,
  children,
}: Props) => {
  return (
    <div
      className="
      bg-white/[0.03]
      border
      border-white/10
      rounded-3xl
      p-6
      backdrop-blur-xl
      "
    >
      <h2
        className="
        text-lg
        font-semibold
        mb-5
        "
      >
        {title}
      </h2>

      {children}
    </div>
  );
};

export default WorkspaceCard;