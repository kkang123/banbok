"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useAuthStore } from "../../_store/authStore";

import { successToastOptions, errorToastOptions } from "./CodeUrlInput.style";

export const CodeUrlInput = () => {
  const [codeurl, setCodeurl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = !!user;

  const handleSubmit = async () => {
    if (!codeurl.trim()) return;

    try {
      setIsLoading(true);

      const scrapeRes = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: codeurl }),
      });

      const scraped = await scrapeRes.json();
      if (!scrapeRes.ok) {
        throw new Error(scraped.message || "크롤링 실패");
      }

      const { title, link, site } = scraped;

      console.log("크롤링 결과:", title, site, link);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/problems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },

          body: JSON.stringify({
            title,
            link,
            site,
          }),
          mode: "cors",
        },
      );

      console.log("크롤링 결과:", title, site, link);

      if (response.ok) {
        toast.success(
          `문제 등록 완료 (${site} : ${title})`,
          successToastOptions,
        );
        setCodeurl("");
      } else {
        const errorData = await response.json();
        toast.error(
          "오류: " + (errorData.message || response.statusText),
          errorToastOptions,
        );
      }
    } catch (error) {
      console.error("서버 요청 실패:", error);
      toast.error("서버 요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <section>
      <div className="w-full max-w-sm sm:flex">
        <input
          type="text"
          placeholder={
            isAuthenticated
              ? "해결한 코딩테스트 링크를 작성해주세요..."
              : "로그인 후 사용해주세요"
          }
          value={codeurl}
          onChange={(e) => setCodeurl(e.target.value)}
          onKeyDown={handleKeyPress}
          className={`w-full p-2 border-black 
               sm:border-r-0 
               rounded-2xl sm:rounded-tl-2xl sm:rounded-tr-none 
               sm:rounded-bl-2xl sm:rounded-br-none 
               focus:outline-none 
               text-sm sm:text-base 
               h-10
              ${isAuthenticated ? "bg-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
          style={{ minWidth: "300px" }}
          disabled={!isAuthenticated || isLoading}
        />

        <button
          onClick={handleSubmit}
          className={`sw-full h-10 sm:w-auto w-[300px] whitespace-nowrap mt-2 sm:mt-0 px-4 py-2 border rounded-2xl sm:rounded-r-2xl sm:rounded-l-none transition-all flex items-center justify-center ${
            isAuthenticated
              ? isLoading
                ? "opacity-70 cursor-not-allowed border-blue-500 bg-blue-500 text-white"
                : "hover:bg-blue-600 border-blue-500 bg-blue-500 text-white"
              : "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={isLoading || !isAuthenticated}
        >
          {isLoading ? "전송 중..." : "전송"}
        </button>
      </div>
    </section>
  );
};
