import { Link } from "react-router-dom";
import { ShoppingBag, Menu } from "lucide-react";
import logo from "../../assets/images/logo/logo.png";

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="h-20 flex items-center justify-between">

                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <img
                            src={logo}
                            alt="God Is Involved"
                            className="h-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                        />

                        <div>
                            <p className="font-bold tracking-[0.2em] text-white">
                                GOD IS INVOLVED
                            </p>

                            <p className="text-xs text-[#D4AF37]">
                                PREMIUM BUILDING MATERIALS
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-10">
                        <Link
                            to="/materials"
                            className="text-white/70 hover:text-white"
                        >
                            Materials
                        </Link>

                        <Link
                            to="/quotation"
                            className="text-white/70 hover:text-white"
                        >
                            Quotations
                        </Link>

                        <Link
                            to="/contact"
                            className="text-white/70 hover:text-white"
                        >
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link to="/cart">
                            <ShoppingBag size={20} />
                        </Link>

                        <button>
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;