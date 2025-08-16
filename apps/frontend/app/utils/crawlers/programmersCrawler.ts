import { SiteCrawler, CrawlingResult } from "../../_type/crawler.type";
import { CheerioAPI } from "cheerio";

export const programmersCrawler: SiteCrawler = {
  canHandle: (url: string) => url.includes("school.programmers.co.kr"),

  crawl: async ($: CheerioAPI, url: string): Promise<CrawlingResult> => {
    const title = $(".challenge-title").text().trim();

    return {
      title,
      site: "Programmers",
      link: url,
    };
  },
};
