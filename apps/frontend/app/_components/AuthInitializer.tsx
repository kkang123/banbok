"use client";

import { useEffect } from "react";
import { useAuthStore } from "../_store/authStore";

const AuthInitializer = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return null;
};

export default AuthInitializer;
