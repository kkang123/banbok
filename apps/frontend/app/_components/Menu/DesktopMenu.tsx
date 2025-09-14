import ProfileButton from "../Button/ProfileButton";
import LoginStatusButton from "../Header/LoginStatusButton";

const DesktopMenu = () => (
  <div className="hidden sm:flex sm:items-center sm:gap-4">
    <ProfileButton />
    <LoginStatusButton />
  </div>
);

export default DesktopMenu;
