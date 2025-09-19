"use client";

import { useRouter } from "next/navigation";
import { NaverLogin } from "../../_components/Button/OauthLoginButton";

export default function Login() {
  const router = useRouter();

  const handleTitleClick = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1
            onClick={handleTitleClick}
            className="cursor-pointer text-3xl font-bold text-gray-800"
          >
            반복
          </h1>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <NaverLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
