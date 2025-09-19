import Image from "next/image";

export function NaverLogin() {
  const handleNaverLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/naver`;
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

export function GoogleLogin() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/v1/oauth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-red-400 p-2 transition-colors hover:bg-red-400 hover:text-white"
      aria-label="구글 로그인"
    >
      <Image
        src="assets/icon/google_icon.svg"
        alt="구글 아이콘"
        width={20}
        height={20}
      />
      <span>구글 로그인</span>
    </button>
  );
}
