"use client";

import { useState } from "react";

import { SectionProps } from "../../_type/sectionprops.type";
import { useAuthStore } from "../../_store/authStore";

export const CodeUrlInput: React.FC<SectionProps> = ({
  isActive,
  onClick,
  id,
}) => {
  const [codeurl, setCodeurl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = !!user;

  const handleSubmit = async () => {
    if (!codeurl.trim()) return;

    try {
      setIsLoading(true);

      // 1. 먼저 Next API Route (/api/scrape)로 요청
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

      // 2. 서버로 전송
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/problems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          // body: JSON.stringify({ link: codeurl }),
          body: JSON.stringify({
            title,
            link,
            site,
          }),
          mode: "cors",
        }
      );

      console.log("크롤링 결과:", title, site, link);

      if (response.ok) {
        // alert("URL 저장 완료: " + codeurl);
        console.log("✅ 문제 정보 서버 전송 성공 (status 200)");
        alert("문제 정보 저장 완료! " + codeurl + ", " + title + ", " + site);
        setCodeurl("");
      } else {
        const errorData = await response.json();
        alert(
          "오류가 발생했습니다: " + (errorData.message || response.statusText)
        );
      }
    } catch (error) {
      console.error("서버 요청 실패:", error);
      alert("서버 요청 중 오류가 발생했습니다.");
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
    <section
      id={id}
      className={`min-h-screen w-full flex justify-center items-center bg-white transition-opacity duration-500 px-4 ${
        isActive ? "opacity-100" : "opacity-50"
      }`}
      onClick={onClick}
    >
      <div className="w-full max-w-sm sm:flex">
        <input
          type="text"
          placeholder={
            isAuthenticated
              ? "해결한 코테 링크를 작성해주세요..."
              : "로그인 후 사용해주세요"
          }
          value={codeurl}
          onChange={(e) => setCodeurl(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full p-2 border border-black 
               sm:border-r-0 
               rounded-2xl sm:rounded-tl-2xl sm:rounded-tr-none 
               sm:rounded-bl-2xl sm:rounded-br-none 
               focus:outline-none 
               text-sm sm:text-base"
          disabled={isLoading}
        />

        <button
          onClick={handleSubmit}
          className={`w-full sm:w-auto whitespace-nowrap mt-2 sm:mt-0 px-4 py-2 border rounded-2xl sm:rounded-r-2xl sm:rounded-l-none transition-all ${
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
