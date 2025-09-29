import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthState } from "../_type/userInfo.type";

import { API_BASE_URL, ENDPOINTS } from "../_constants/api";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      hasHydrated: false,
      token: null,

      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const token = localStorage.getItem("accessToken");
          set({ token });

          if (!token) {
            set({ user: null });
            return;
          }

          const res = await fetch(`${API_BASE_URL}${ENDPOINTS.ME}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

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
          // 추후 도메인 추가시 적용 예정
          // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/logout`, {
          //   method: "POST",
          //   credentials: "include",
          // });

          localStorage.removeItem("accessToken");

          set({ user: null, token: null });
        } catch (error) {
          console.error("로그아웃 실패:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);
