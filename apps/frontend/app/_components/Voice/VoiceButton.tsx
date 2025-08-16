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
          className="fixed bottom-4 right-4 p-2 bg-gray-300 hover:bg-gray-400 text-white rounded-full z-[100]"
          aria-label="음성 인식 켜기"
        >
          <Image
            src="/mic_off.svg"
            alt="음성 인식 켜기"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>
      )}
      {show && <LazyVoiceNavigation autoStart={autoStart} />}
    </>
  );
}
