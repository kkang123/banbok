import { CheerioAPI } from "cheerio";
import { SubmitProblemRequestDto } from "@banbok/shared";

export interface SiteCrawler {
  canHandle: (url: string) => boolean;
  crawl: ($: CheerioAPI, url: string) => Promise<SubmitProblemRequestDto>;
}
