import { API_BASE_URL, ENDPOINTS } from "@/app/_constants/api";

export async function scrapeProblem(link: string) {
  const res = await fetch("/api/scrape", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ link }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "크롤링 실패");
  }

  return res.json();
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

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || res.statusText);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
