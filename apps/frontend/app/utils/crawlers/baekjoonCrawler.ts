import { SiteCrawler, CrawlingResult } from "../../_type/crawler.type";
import { CheerioAPI } from "cheerio";

export const baekjoonCrawler: SiteCrawler = {
  canHandle: (url: string) => url.includes("acmicpc.net"),

  crawl: async ($: CheerioAPI, url: string): Promise<CrawlingResult> => {
    const title = $("#problem_title").text().trim();

    return {
      title,
      site: "Baekjoon",
      link: url,
    };
  },
};
