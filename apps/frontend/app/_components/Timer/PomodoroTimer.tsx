"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0); // 타이머 초기 값
  const [isRunning, setIsRunning] = useState(false);
  const timeLeftRef = useRef(timeLeft);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const addTime = (minutes: number) => {
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  // 시작/일시정지 버튼
  const toggleTimerBtn = useCallback(() => {
    if (timeLeftRef.current > 0) {
      setIsRunning((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    console.log("toggleTimerBtn 함수가 생성됨");
  }, [toggleTimerBtn]);

  // 리셋 버튼
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

  // 시간 포맷팅
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div className="sm:hidden mobile-timer">
        <div className="fixed top-1/4 left-2 p-2 rounded-lg shadow-md bg-white w-32">
          <div className="text-center text-xl font-bold mb-2">
            {formatTime(timeLeft)}
          </div>

          <div className="grid grid-cols-2 gap-1 mb-1 ">
            {[20, 35, 50, 60].map((min) => (
              <button
                key={min}
                onClick={() => addTime(min)}
                className="bg-blue-100 text-xs hover:bg-blue-200 text-blue-800 font-medium py-0.5 rounded"
              >
                {min}분
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-1">
            <button
              onClick={toggleTimerBtn}
              disabled={timeLeft === 0}
              className={`px-1 py-0.5 rounded text-xs text-white whitespace-nowrap ${
                isRunning
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isRunning ? "일시정지" : "시작"}
            </button>
            <button
              onClick={resetTimer}
              className="px-1 py-0.5 bg-gray-500 hover:bg-gray-600 text-xs text-white rounded"
            >
              리셋
            </button>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="hidden sm:block desktop-timer">
        <div className="fixed top-1/3 left-2 p-4 rounded-lg shadow-md bg-white w-42 -translate-y-1/2">
          <div className="text-center text-3xl font-bold mb-4">
            {formatTime(timeLeft)}
          </div>

          <div className="grid grid-cols-1 gap-2 mb-4">
            {[20, 35, 50, 60].map((min) => (
              <button
                key={min}
                onClick={() => addTime(min)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-1 rounded"
              >
                {min}분
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={toggleTimerBtn}
              disabled={timeLeft === 0}
              className={`px-2 py-1 rounded text-white whitespace-nowrap ${
                isRunning
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isRunning ? "일시정지" : "시작"}
            </button>
            <button
              onClick={resetTimer}
              className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded"
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
