import { Problem } from "@/app/_type/problem";
import { API_BASE_URL, ENDPOINTS } from "@/app/_constants/api";

export async function fetchUserData(token: string) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.ME}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(`사용자 데이터 요청 실패: ${res.status}`);
  return res.json();
}

export async function fetchProblems(token: string): Promise<Problem[]> {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.PROBLEMS}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(`문제 데이터 요청 실패: ${res.status}`);
  return res.json();
}

export async function fetchProblemsByDate(
  token: string,
  date: string,
): Promise<Problem[]> {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.PROBLEMS}?date=${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(`날짜별 문제 데이터 요청 실패: ${res.status}`);
  return res.json();
}
