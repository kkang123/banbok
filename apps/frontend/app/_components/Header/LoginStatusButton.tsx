"use client";

import { useState, useEffect } from "react";

import { useAuthStore } from "../../_store/authStore";

import LoginButton from "../Button/LoginButton";
import LogoutButton from "../Button/LogoutButton";

const LoginStatusButton = () => {
  const user = useAuthStore((state) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  const isAuthenticated = !!user;

  return <nav>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</nav>;
};

export default LoginStatusButton;
