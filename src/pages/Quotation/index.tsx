import { useState } from "react";

const Quotation = () => {
  const [projectType, setProjectType] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");

  return (
    <div className="pt-32 max-w-5xl mx-auto px-6">
      <div className="mb-16">
        <p className="uppercase tracking-[0.3em] text-white/50 mb-4">
          Quotation Generator
        </p>

        <h1 className="text-6xl font-bold">
          Generate
          <br />
          Instant Quote
        </h1>
      </div>

      <div className="grid gap-8">
        <select
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-4"
        >
          <option value="">Select Project Type</option>
          <option>Wardrobe</option>
          <option>Kitchen Cabinet</option>
          <option>TV Console</option>
          <option>Office Desk</option>
        </select>

        <input
          placeholder="Width (ft)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-4"
        />

        <input
          placeholder="Height (ft)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-4"
        />

        <input
          placeholder="Depth (ft)"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-4"
        />

        <button className="bg-[#D4AF37] text-black py-4 rounded-full font-semibold">
          Generate Quote
        </button>
      </div>

      <div className="mt-20 border border-white/10 rounded-3xl p-10">
        <h2 className="text-3xl font-bold mb-6">
          Quote Preview
        </h2>

        <div className="space-y-4 text-white/70">
          <p>Materials Required</p>
          <p>Accessories Required</p>
          <p>Estimated Cost</p>
        </div>
      </div>
    </div>
  );
};

export default Quotation;