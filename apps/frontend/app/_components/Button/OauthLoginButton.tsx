import Image from "next/image";

import { API_BASE_URL, ENDPOINTS } from "@/app/_constants/api";

export function NaverLogin() {
  const handleNaverLogin = () => {
    window.location.href = `${API_BASE_URL}${ENDPOINTS.NAVER_LOGIN}`;
  };

  return (
    <button
      onClick={handleNaverLogin}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-green-500 p-2 transition-colors hover:bg-green-500 hover:text-white"
      aria-label="네이버 로그인"
    >
      <Image
        src="/assets/icon/naver_icon.svg"
        alt="네이버 아이콘"
        width={20}
        height={20}
      />
      <span>네이버 로그인</span>
    </button>
  );
}
