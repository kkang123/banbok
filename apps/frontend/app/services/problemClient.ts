import { API_BASE_URL, ENDPOINTS } from "@/app/_constants/api";

export async function scrapeProblem(link: string) {
  const res = await fetch("/api/scrape", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ link }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("서버 응답이 올바르지 않습니다.");
  }

  if (!res.ok) {
    if (res.status >= 500) {
      throw new Error(
        "크롤링 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
    throw new Error(data.message || "크롤링 실패");
  }

  return data;
}

export async function submitProblem(
  token: string | null,
  problem: { title: string; link: string; site: string },
) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.PROBLEMS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(problem),
    mode: "cors",
  });

  let data = null;
  try {
    const text = await res.text();
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("서버 응답이 올바르지 않습니다.");
  }

  if (!res.ok) {
    switch (res.status) {
      case 400:
      case 409:
        throw new Error(data.message || "잘못된 요청입니다.");
      case 404:
        throw new Error("데이터를 찾을 수 없습니다.");
      case 500:
        throw new Error("서버 내부 오류가 발생했습니다.");
      default:
        throw new Error(data.message || "문제 등록 실패");
    }
  }
  return data;
}
