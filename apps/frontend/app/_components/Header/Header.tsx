import { useState } from "react";

import Link from "next/link";

import { useAuthStore } from "../../_store/authStore";

import MobileMenu from "../Menu/MobileMenu";
import DesktopMenu from "../Menu/DesktopMenu";

const Header = () => {
  return (
    <header className="flex justify-between absolute top-0 left-0 w-full bg-gray-800 text-white p-4 z-50 pointer-events: none;">
      <Link href="/" className="text-xl font-bold">
        Banbok
      </Link>

      <MobileMenu />
      <DesktopMenu />
    </header>
  );
};

export default Header;
