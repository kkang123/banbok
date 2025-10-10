"use client";

import { usePathname } from "next/navigation";
import PomodoroTimer from "./PomodoroTimer";

const PomodoroWrapper = () => {
  const pathname = usePathname();

  const hiddenPaths = ["/login", "/profile"];

  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return <PomodoroTimer />;
};

export default PomodoroWrapper;
