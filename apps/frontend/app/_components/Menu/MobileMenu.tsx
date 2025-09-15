import { useState } from "react";

import { useAuthStore } from "../../_store/authStore";

import ProfileButton from "../Button/ProfileButton";
import LoginStatusButton from "../Header/LoginStatusButton";
import MenuButton from "../Button/MenuButton";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="sm:hidden">
      {!user ? (
        <LoginStatusButton />
      ) : (
        <>
          <MenuButton onClick={toggleMenu} />
          {isOpen && (
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
      )}
    </div>
  );
};

export default MobileMenu;
