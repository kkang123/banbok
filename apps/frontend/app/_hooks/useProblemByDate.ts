"use client";

import { useState } from "react";

import { Problem } from "@/app/_type/problem";

import { fetchProblemsByDate } from "@/app/api/problem";

export function useProblemByDate() {
  const [error, setError] = useState<string | null>(null);

  const fetchByDate = async (
    token: string,
    date: string,
  ): Promise<Problem[]> => {
    try {
      return await fetchProblemsByDate(token, date);
    } catch (err) {
      setError("날짜별 문제 불러오기 실패");
      console.error("날짜별 문제 불러오는 중 오류 발생", err);
      return [];
    }
  };

  return { fetchByDate, error };
}
