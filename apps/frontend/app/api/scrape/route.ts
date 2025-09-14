import { NextRequest, NextResponse } from "next/server";
import { CrawlerManager } from "../../utils/crawlerManager";

export async function POST(req: NextRequest) {
  const { link } = await req.json();
  const crawlerManager = new CrawlerManager();

  try {
    const result = await crawlerManager.crawl(link);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: "올바르지 않은 URL 형식입니다", error },
      { status: 400 },
    );
  }
}
