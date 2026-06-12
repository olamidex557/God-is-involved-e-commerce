const Footer = () => {
  return (
    <footer className="border-t border-white/10 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">
              GOD IS INVOLVED
            </h3>

            <p className="text-white/60">
              Premium building materials and furniture
              accessories supplier.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Address
            </h4>

            <p className="text-white/60">
              419 Oke-Aro Road
              <br />
              Lagos, Nigeria
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Contact
            </h4>

            <p className="text-white/60">
              support@godisinvolved.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;