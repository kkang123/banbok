"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useVoiceCommandStore } from "../../_store/voiceCommands";
import {
  SpeechRecognitionEvent,
  SpeechRecognitionConstructor,
  SpeechRecognition,
} from "../../_type/speechRecognition.type";

const VoiceNavigation = ({ autoStart = false }) => {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const executeCommand = useVoiceCommandStore((state) => state.executeCommand);

  useEffect(() => {
    const SpeechRecognition =
      (
        window as Window &
          typeof globalThis & {
            SpeechRecognition: SpeechRecognitionConstructor;
            webkitSpeechRecognition: SpeechRecognitionConstructor;
          }
      ).SpeechRecognition ||
      (
        window as Window &
          typeof globalThis & {
            SpeechRecognition: SpeechRecognitionConstructor;
            webkitSpeechRecognition: SpeechRecognitionConstructor;
          }
      ).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      // 음성 명령 처리
      if (transcript.includes("홈으로")) {
        router.push("/");
      } else if (transcript.includes("로그인")) {
        router.push("/login");
      } else if (transcript.includes("마이페이지")) {
        router.push("/profile");
      } else if (transcript.includes("로그아웃")) {
        executeCommand("logout");
      } else if (transcript.includes("코드 전송")) {
        executeCommand("submitCode");
      }
    };

    recognitionRef.current = recognition;

    if (isEnabled) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [router, isEnabled, executeCommand]);

  const toggleVoiceRecognition = () => {
    if (isEnabled) {
      // 음성 인식 중지
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsEnabled(false);
    } else {
      // 음성 인식 시작
      setIsEnabled(true);
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    }
  };

  useEffect(() => {
    if (autoStart) setIsEnabled(true);
  }, [autoStart]);

  return (
    <div className="fixed right-4 bottom-4 flex flex-col items-end gap-2">
      <button
        onClick={toggleVoiceRecognition}
        className={`rounded-full p-2 transition-colors ${
          isEnabled
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
        aria-label={isEnabled ? "음성 인식 끄기" : "음성 인식 켜기"}
      >
        <Image
          src={isEnabled ? "/mic_on.svg" : "/mic_off.svg"}
          alt={isEnabled ? "음성 인식 켜짐" : "음성 인식 꺼짐"}
          width={24}
          height={24}
          className="h-6 w-6"
        />
      </button>
      {isEnabled && (
        <div className="rounded-full bg-blue-500 px-4 py-2 text-white">
          {isListening ? "음성 인식 중..." : "음성 인식 대기 중"}
        </div>
      )}
    </div>
  );
};

export default VoiceNavigation;
