import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthState } from "../_type/userInfo.type";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      hasHydrated: false,

      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/members/me`,
            {
              credentials: "include",
            },
          );

          const contentType = res.headers.get("content-type");
          const text = await res.text();

          if (res.ok && contentType?.includes("application/json")) {
            const data = JSON.parse(text);
            set({ user: data });
          } else {
            set({ user: null });
          }
        } catch (error) {
          console.error("유저 정보 불러오기 실패:", error);
          set({ user: null });
        } finally {
          set({ isLoading: false, hasHydrated: true });
        }
      },

      logout: async () => {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
          set({ user: null });
        } catch (error) {
          console.error("로그아웃 실패:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
