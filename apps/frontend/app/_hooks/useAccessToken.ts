"use client";

import { useEffect } from "react";

export const useAccessToken = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("accessToken");

    if (token) {
      localStorage.setItem("accessToken", token);

      url.searchParams.delete("accessToken");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);
};
