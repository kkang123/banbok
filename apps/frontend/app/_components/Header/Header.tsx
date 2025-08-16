import { useState } from "react";
import Image from "next/image";

import { useAuthStore } from "../../_store/authStore";
import ProfileButton from "../Button/ProfileButton";
import LoginStatusButton from "./LoginStatusButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between absolute top-0 left-0 w-full bg-gray-800 text-white p-4 z-50 pointer-events: none;">
      <h1 className="text-xl font-bold">Banbok</h1>

      {/* 모바일 뷰 */}
      <div className="sm:hidden">
        {user ? (
          <>
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="더보기 메뉴"
            >
              <Image
                src="/assets/icon/Menu.svg"
                alt="더보기 메뉴"
                width={24}
                height={24}
              />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2">
                  <ProfileButton />
                </div>
                <div className="px-4 py-2">
                  <LoginStatusButton />
                </div>
              </div>
            )}
          </>
        ) : (
          <LoginStatusButton />
        )}
      </div>

      {/* 데스크탑 뷰 */}
      <div className="hidden sm:flex sm:items-center sm:gap-4">
        <ProfileButton />
        <LoginStatusButton />
      </div>
    </header>
  );
};

export default Header;
