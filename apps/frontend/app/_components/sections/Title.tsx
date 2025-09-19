"use client";

import Header from "../Header/Header";
import { CodeUrlInput } from "./CodeUrlInput";

export const Title = () => {
  return (
    <>
      <Header />
      <div
        className={`flex min-h-screen w-full cursor-pointer flex-col items-center justify-center bg-gray-900 px-4 transition-opacity duration-500`}
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-white sm:text-3xl">
          반 복
        </h2>
        <p className="mb-8 px-4 text-center text-base text-white sm:px-0 sm:text-lg">
          해결한 코딩테스트 문제의 링크를 등록하고{" "}
          <br className="hidden sm:block" />
          1일, 3일, 7일, 21일마다 알림을 받아 반복해서 문제를 해결해보세요!!
        </p>

        <CodeUrlInput />
      </div>
    </>
  );
};
