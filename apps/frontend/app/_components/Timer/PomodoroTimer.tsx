"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timeLeftRef = useRef(timeLeft);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const addTime = (minutes: number) => {
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  const toggleTimerBtn = useCallback(() => {
    if (timeLeftRef.current > 0) {
      setIsRunning((prev) => !prev);
    }
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      new Audio("/notification.mp3").play().catch(console.error);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div className="mobile-timer sm:hidden">
        <div className="fixed top-1/4 left-2 w-32 rounded-lg bg-white p-2 shadow-md">
          <div className="mb-2 text-center text-xl font-bold">
            {formatTime(timeLeft)}
          </div>

          <div className="mb-1 grid grid-cols-2 gap-1">
            {[20, 35, 50, 60].map((min) => (
              <button
                key={min}
                onClick={() => addTime(min)}
                className="rounded bg-blue-100 py-0.5 text-xs font-medium text-blue-800 hover:bg-blue-200"
              >
                {min}분
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-1">
            <button
              onClick={toggleTimerBtn}
              disabled={timeLeft === 0}
              className={`rounded px-1 py-0.5 text-xs whitespace-nowrap text-white ${
                isRunning
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isRunning ? "일시정지" : "시작"}
            </button>
            <button
              onClick={resetTimer}
              className="rounded bg-gray-500 px-1 py-0.5 text-xs text-white hover:bg-gray-600"
            >
              리셋
            </button>
          </div>
        </div>
      </div>

      <div className="desktop-timer hidden sm:block">
        <div className="fixed top-[28.57%] left-2 w-40 -translate-y-1/2 rounded-lg bg-white p-4 shadow-md">
          <div className="mb-4 text-center text-3xl font-bold">
            {formatTime(timeLeft)}
          </div>

          <div className="mb-4 grid grid-cols-1 gap-2">
            {[20, 35, 50, 60].map((min) => (
              <button
                key={min}
                onClick={() => addTime(min)}
                className="rounded bg-blue-100 py-1 font-medium text-blue-800 hover:bg-blue-200"
              >
                {min}분
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={toggleTimerBtn}
              disabled={timeLeft === 0}
              className={`rounded px-2 py-1 whitespace-nowrap text-white ${
                isRunning
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isRunning ? "일시정지" : "시작"}
            </button>
            <button
              onClick={resetTimer}
              className="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
            >
              리셋
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PomodoroTimer;
