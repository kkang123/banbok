"use client";

import { useAuthStore } from "../../_store/authStore";
import LoginButton from "../Button/LoginButton";
import LogoutButton from "../Button/LogoutButton";
import { useState, useEffect } from "react";

const LoginStatusButton = () => {
  const user = useAuthStore((state) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null; // 아직 hydration 안 됐으면 아무것도 안 보여줌

  const isAuthenticated = !!user;

  return <nav>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</nav>;
};

export default LoginStatusButton;
