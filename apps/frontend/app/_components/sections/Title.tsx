"use client";

import Header from "../Header/Header";
import { CodeUrlInput } from "./CodeUrlInput";

export const Title = () => {
  return (
    <>
      <Header />
      <div
        className={`min-h-screen w-full flex flex-col justify-center items-center bg-gray-900 transition-opacity duration-500 cursor-pointer px-4 `}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white text-center">
          반 복
        </h2>
        <p className="text-base sm:text-lg text-center text-white mb-8 px-4 sm:px-0">
          해결한 코딩테스트 문제의 링크를 등록하고{" "}
          <br className="hidden sm:block" />
          1일, 3일, 7일, 21일마다 알림을 받아 반복해서 문제를 해결해보세요!!
        </p>

        <CodeUrlInput />
      </div>
    </>
  );
};
