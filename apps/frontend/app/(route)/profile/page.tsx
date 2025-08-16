"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useAuthStore } from "../../_store/authStore";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, hasHydrated } = useAuthStore();

  const isAuthenticated = !!user;

  useEffect(() => {
    if (hasHydrated && !isLoading && !user) {
      router.push("/login");
    }
  }, [hasHydrated, isLoading, user, router]);

  if (!hasHydrated || isLoading) {
    return <div className="text-center p-4">로딩 중...</div>;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const userId = user.email?.split("@")[0] || "user";

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">내 프로필</h1>

        <div className="flex items-center gap-4 mb-6">
          {user.profileImage ? (
            <Image
              src={user.profileImage}
              alt="프로필 이미지"
              width={80}
              height={80}
              className="rounded-full border-2 border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xl text-gray-500">
                {user.name?.charAt(0) || "?"}
              </span>
            </div>
          )}

          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-600">@{userId}</p>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <button
            onClick={() =>
              useAuthStore
                .getState()
                .logout()
                .then(() => router.push("/login"))
            }
            className="w-full py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition"
          >
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}
