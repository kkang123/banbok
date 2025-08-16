// import { SiteCrawler, CrawlingResult } from "../../_type/crawler.type";
// import { CheerioAPI } from "cheerio";

// export const leetcodeCrawler: SiteCrawler = {
//   canHandle: (url: string) => url.includes("leetcode.com/problems"),

//   crawl: async ($: CheerioAPI, url: string): Promise<CrawlingResult> => {
//     // 문제 제목이 들어있는 a 태그 선택
//     const rawTitle = $('a[href^="/problems/"]').first().text().trim();

//     // 크롤링된 rawTitle을 확인
//     console.log("Raw Title:", rawTitle);

//     // 숫자와 점 제거
//     const title = rawTitle.replace(/^\d+\.\s*/, "");

//     return {
//       title,
//       site: "Leetcode",
//       link: url,
//     };
//   },
// };
import { SiteCrawler, CrawlingResult } from "../../_type/crawler.type";
import { CheerioAPI } from "cheerio";

export const leetcodeCrawler: SiteCrawler = {
  canHandle: (url: string) => url.includes("leetcode.com/problems"),

  crawl: async (_: CheerioAPI, url: string): Promise<CrawlingResult> => {
    const slugMatch = url.match(/leetcode\.com\/problems\/([^\/]+)/);
    const slug = slugMatch?.[1] || "Unknown Title";

    const title = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      title,
      site: "Leetcode",
      link: url,
    };
  },
};
