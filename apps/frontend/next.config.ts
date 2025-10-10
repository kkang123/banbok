import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

// bundleAnalyzer 초기화
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// 기존 Next.js 설정
const nextConfig: NextConfig = {
  images: {
    domains: ["phinf.pstatic.net"], // 네이버 이미지 서버 도메인 추가
  },
};

// 최종 내보내기 – 번들 분석 켜졌을 때만 적용
export default withBundleAnalyzer(nextConfig);
