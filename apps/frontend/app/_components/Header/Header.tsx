import Link from "next/link";

import MobileMenu from "../Menu/MobileMenu";
import DesktopMenu from "../Menu/DesktopMenu";

const Header = () => {
  return (
    <header className="pointer-events: none; absolute top-0 left-0 z-50 flex w-full justify-between bg-gray-800 p-4 text-white">
      <Link href="/" className="text-xl font-bold">
        Banbok
      </Link>

      <MobileMenu />
      <DesktopMenu />
    </header>
  );
};

export default Header;
