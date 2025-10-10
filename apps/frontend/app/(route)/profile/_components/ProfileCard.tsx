import Image from "next/image";

import { useAuthStore } from "@/app/_store/authStore";

import { AuthState } from "@/app/_type/userInfo.type";

interface ProfileCardProps {
  user: NonNullable<AuthState["user"]>;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const logout = useAuthStore((state) => state.logout);

  const userId = user.email?.split("@")[0] || "user";

  return (
    <div>
      <div className="mx-auto mt-20 max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">내 프로필</h1>

        <div className="mb-6 flex items-center gap-8 p-2">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-200">
            {user.profileImage ? (
              <Image
                src={user.profileImage}
                alt="프로필 이미지"
                width={96}
                height={96}
                className="h-full w-full object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <span className="text-xl text-gray-500">
                  {user.name?.charAt(0) || "?"}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-600">@{userId}</p>
            <p className="mt-1 text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <button
            onClick={logout}
            className="w-full rounded-md bg-red-50 py-2 text-red-600 transition hover:bg-red-100"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
