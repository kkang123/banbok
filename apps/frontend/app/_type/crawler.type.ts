import { CheerioAPI } from "cheerio";

export interface CrawlingResult {
  title: string;
  site: string;
  link: string;
}

export interface SiteCrawler {
  canHandle: (url: string) => boolean;
  crawl: ($: CheerioAPI, url: string) => Promise<CrawlingResult>;
}
