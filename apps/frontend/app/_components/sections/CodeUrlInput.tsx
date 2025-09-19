"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import clsx from "clsx";

import { useAuthStore } from "../../_store/authStore";

import {
  successToastOptions,
  errorToastOptions,
  serverErrorToastOptions,
} from "./CodeUrlInput.style";

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

      if (response.ok) {
        toast.success(`문제 등록 (${site} : ${title})`, successToastOptions);
        setCodeurl("");
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || response.statusText,
          errorToastOptions,
        );
      }
    } catch (error: any) {
      toast.error(
        error.message || "서버 요청 중 오류가 발생했습니다.",
        serverErrorToastOptions,
      );
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
          className={clsx(
            "h-10 w-full rounded-2xl border-black p-2 text-sm focus:outline-none sm:rounded-tl-2xl sm:rounded-tr-none sm:rounded-br-none sm:rounded-bl-2xl sm:border-r-0 sm:text-base",
            isAuthenticated
              ? "bg-white"
              : "cursor-not-allowed bg-gray-200 text-gray-500",
          )}
          style={{ minWidth: "300px" }}
          disabled={!isAuthenticated || isLoading}
        />

        <button
          onClick={handleSubmit}
          className={clsx(
            "sw-full mt-2 flex h-10 w-[300px] items-center justify-center rounded-2xl border px-4 py-2 whitespace-nowrap transition-all sm:mt-0 sm:w-auto sm:rounded-l-none sm:rounded-r-2xl",
            isAuthenticated
              ? isLoading
                ? "cursor-not-allowed border-blue-500 bg-blue-500 text-white opacity-70"
                : "border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
              : "cursor-not-allowed border-gray-300 bg-gray-300 text-gray-500",
          )}
          disabled={isLoading || !isAuthenticated}
        >
          {isLoading ? "전송 중..." : "전송"}
        </button>
      </div>
    </section>
  );
};
