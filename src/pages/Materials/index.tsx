const Materials = () => {
  const products = Array.from({ length: 8 });

  return (
    <div className="pt-32 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="mb-20">
        <p className="uppercase tracking-[0.3em] text-white/50 mb-4">
          Materials
        </p>

        <h1 className="text-6xl font-bold">
          Explore
          <br />
          Premium Materials
        </h1>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {products.map((_, index) => (
          <div
            key={index}
            className="group cursor-pointer"
          >
            <div className="h-[350px] bg-zinc-900 rounded-3xl overflow-hidden"></div>

            <div className="mt-4">
              <h3 className="font-semibold">
                Walnut MDF
              </h3>

              <p className="text-white/50">
                Starting from ₦25,000
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;