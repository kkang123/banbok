import { NextRequest, NextResponse } from "next/server";
import { CrawlerManager } from "../../utils/crawlerManager";

export async function POST(req: NextRequest) {
  try {
    const { link } = await req.json();
    const crawlerManager = new CrawlerManager();

    if (!link || typeof link !== "string" || !link.startsWith("http")) {
      return NextResponse.json(
        { message: "올바르지 않은 URL 형식입니다." },
        { status: 400 },
      );
    }

    const result = await crawlerManager.crawl(link);

    if (!result || !result.title) {
      throw new Error("크롤링 결과가 올바르지 않습니다.");
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("❌ /api/scrape 서버 에러:", error);

    const message =
      error instanceof Error
        ? error.message
        : "크롤링 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
