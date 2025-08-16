"use client";

import { useCallback, useEffect } from "react";
import { useAuthStore } from "../../_store/authStore";
import { useVoiceCommandStore } from "../../_store/voiceCommands";

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const setCommandHandler = useVoiceCommandStore(
    (state) => state.setCommandHandler
  );

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  useEffect(() => {
    setCommandHandler("logout", handleLogout);
    return () => {
      setCommandHandler("logout", () => {});
    };
  }, [setCommandHandler, handleLogout]);

  return (
    <button onClick={handleLogout} className="logout-button cursor-pointer">
      로그아웃
    </button>
  );
};

export default LogoutButton;
