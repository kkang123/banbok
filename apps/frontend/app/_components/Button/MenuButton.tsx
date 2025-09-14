import Image from "next/image";

interface MenuButtonProps {
  onClick: () => void;
}

const MenuButton = ({ onClick }: MenuButtonProps) => (
  <button
    onClick={onClick}
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
);

export default MenuButton;
