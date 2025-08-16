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
      { message: "크롤링 실패", error },
      { status: 500 }
    );
  }
}
