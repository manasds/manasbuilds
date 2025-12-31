import Link from "next/link";
import { navbarConfig } from "@/config/Navbar";
const Navbar = () => {
  return (
    <div className="animate-fade-in-blur mx-auto max-w-3xl px-4 h-16 sticky top-0 z-20 rounded-md backdrop-blur-sm">
      <div className="flex justify-between items-center px-6 h-full">
        <div className="h-full flex items-baseline-last gap-4">
          {navbarConfig.navItems.map((item) => (
            <Link
              className="text-white font-semibold tracking-wide transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4"
              key={item.label}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="text-white flex gap-4">
          <span>search</span>
          <span>themetoggle</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
