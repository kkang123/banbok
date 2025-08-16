"use client";

import { useEffect } from "react";
import { useAuthStore } from "../_store/authStore";

const AuthInitializer = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // 백그라운드에서 유저 정보 동기화
  }, [fetchUser]);

  return null; // UI는 없고 동작만 함
};

export default AuthInitializer;
