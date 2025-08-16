"use client";

import { useState, useEffect } from "react";

import { SectionProps } from "../../_type/sectionprops.type";
import IcLineArrow from "../../../public/assets/icon/IcLinekArrow";
import Header from "../Header/Header";

export const Title: React.FC<SectionProps> = ({ isActive, onClick, id }) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // 스크롤 안내 타이머
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(true);

      setTimeout(() => {
        setFadeIn(true);
      }, 50);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <div
        id={id}
        className={`min-h-screen w-full flex flex-col justify-center items-center bg-gray-900 transition-opacity duration-500 cursor-pointer px-4 ${
          isActive ? "opacity-100" : "opacity-50"
        }`}
        onClick={onClick}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white text-center">
          반 복
        </h2>
        <p className="text-base sm:text-lg text-center text-white mb-8 px-4 sm:px-0">
          해결한 코딩테스트 문제의 링크를 등록하고{" "}
          <br className="hidden sm:block" />
          1일, 3일, 7일, 21일마다 알림을 받아 반복해서 문제를 해결해보세요!!
        </p>

        {/* 스크롤 안내 아이콘 */}
        {showScrollIndicator && (
          <div
            className={`absolute bottom-10 flex flex-col items-center animate-bounce transition-opacity duration-1000 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-sm sm:text-base text-white mb-2">
              아래로 스크롤하거나 클릭하세요
            </p>
            <IcLineArrow
              width="24"
              height="24"
              color="white"
              direction="M2 2L14 14L26 2"
            />
          </div>
        )}
      </div>
    </>
  );
};
