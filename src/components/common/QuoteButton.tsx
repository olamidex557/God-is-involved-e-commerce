import { Link } from "react-router-dom";

const QuoteButton = () => {
  return (
    <Link
      to="/quotation"
      className="
      fixed
      bottom-28
      md:bottom-24
      right-4
      md:right-6
      z-50
      bg-[#D4AF37]
      text-black
      px-5
      py-4
      rounded-full
      font-semibold
      shadow-xl
      "
    >
      Generate Quote
    </Link>
  );
};

export default QuoteButton;