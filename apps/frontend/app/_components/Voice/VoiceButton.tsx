"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

export default function VoiceButton() {
  const [show, setShow] = useState(false);
  const [autoStart, setAutoStart] = useState(false);

  const handleClick = () => {
    setShow(true);
    setAutoStart(true);
  };

  const LazyVoiceNavigation = dynamic(() => import("./VoiceNavigation"), {
    ssr: false,
    loading: () => null,
  });

  return (
    <>
      {!show && (
        <button
          onClick={handleClick}
          className="fixed right-4 bottom-4 z-[100] rounded-full bg-gray-300 p-2 text-white hover:bg-gray-400"
          aria-label="음성 인식 켜기"
        >
          <Image
            src="/mic_off.svg"
            alt="음성 인식 켜기"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
      )}
      {show && <LazyVoiceNavigation autoStart={autoStart} />}
    </>
  );
}
