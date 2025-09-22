"use client";

import { usePathname } from "next/navigation";
import PomodoroTimer from "./PomodoroTimer";

const PomodoroWrapper = () => {
  const pathname = usePathname();

  // 숨기고 싶은 경로들
  const hiddenPaths = ["/login", "/profile"];

  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return <PomodoroTimer />;
};

export default PomodoroWrapper;
