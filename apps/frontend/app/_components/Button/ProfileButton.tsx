"use client";

import Link from "next/link";

import { useAuthStore } from "../../_store/authStore";
import { useEffect, useState } from "react";

const ProfileButton = () => {
  const user = useAuthStore((state) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;
  const isAuthenticated = !!user;

  return isAuthenticated ? <Link href="/profile">내정보</Link> : null;
};

export default ProfileButton;
