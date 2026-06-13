import WorkspaceCard from "./WorkspaceCard";

const AiAssistant = () => {
  return (
    <WorkspaceCard
      title="AI Assistant"
    >
      <div className="space-y-3">
        <button
          className="
          w-full
          p-3
          rounded-xl
          bg-white/5
          hover:bg-white/10
          text-left
          "
        >
          Show low stock items
        </button>

        <button
          className="
          w-full
          p-3
          rounded-xl
          bg-white/5
          hover:bg-white/10
          text-left
          "
        >
          Show pending orders
        </button>

        <button
          className="
          w-full
          p-3
          rounded-xl
          bg-white/5
          hover:bg-white/10
          text-left
          "
        >
          Generate weekly report
        </button>
      </div>
    </WorkspaceCard>
  );
};

export default AiAssistant;