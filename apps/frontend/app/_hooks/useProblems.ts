import { useState, useEffect } from "react";

import { Problem, HeatmapValue } from "@/app/_type/problem";

import {
  fetchUserData,
  fetchProblems,
  fetchProblemsByDate,
} from "@/app/api/problem";

interface UseProblemsReturn {
  years: number[];
  selectedYear: number | null;
  setSelectedYear: (year: number) => void;
  data: HeatmapValue[];
  loading: boolean;
  error: string | null;
  fetchByDate: (token: string, date: string) => Promise<Problem[]>;
}

export function useProblems(token: string | null): UseProblemsReturn {
  const [data, setData] = useState<HeatmapValue[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await fetchUserData(token);
        const startYear = new Date(data.createdAt).getFullYear();
        const currentYear = new Date().getFullYear();

        const yearList = Array.from(
          { length: currentYear - startYear + 1 },
          (_, i) => startYear + i,
        );

        setYears(yearList);
        setSelectedYear(currentYear);
      } catch (err) {
        setError("사용자 데이터를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // 📌 연도별 문제 데이터 불러오기
  useEffect(() => {
    if (!token || !selectedYear) return;

    const loadProblems = async () => {
      try {
        setLoading(true);
        const result = await fetchProblems(token);

        const mapped: HeatmapValue[] = result.reduce<HeatmapValue[]>(
          (acc, item) => {
            const date = item.createdAt.split("T")[0];
            const existing = acc.find((d) => d.date === date);

            if (existing) {
              existing.count += 1;
            } else {
              acc.push({ date, count: 1 });
            }
            return acc;
          },
          [],
        );

        setData(mapped);
      } catch (err) {
        setError("문제 데이터를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, [token, selectedYear]);

  // 📌 특정 날짜 문제 가져오기
  const fetchByDate = async (token: string, date: string) => {
    try {
      return await fetchProblemsByDate(token, date);
    } catch (err) {
      setError("날짜별 문제 불러오기 실패");
      console.error(err);
      return [];
    }
  };

  return {
    years,
    selectedYear,
    setSelectedYear,
    data,
    loading,
    error,
    fetchByDate,
  };
}
