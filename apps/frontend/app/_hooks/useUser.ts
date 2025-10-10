"use client";

import { useState, useEffect } from "react";

import { fetchUserData } from "../api/problem";

export function useUser(token: string | null) {
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const load = async () => {
      try {
        setLoading(true);
        const user = await fetchUserData(token);
        const startYear = new Date(user.createdAt).getFullYear();
        const currentYear = new Date().getFullYear();
        const yearList = Array.from(
          { length: currentYear - startYear + 1 },
          (_, i) => startYear + i,
        );
        setYears(yearList);
        setSelectedYear(currentYear);
      } catch (err) {
        setError("사용자 데이터를 불러오는 중 오류 발생");
        console.error("사용자 데이터를 불러오는 중 오류 발생:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  return { years, selectedYear, setSelectedYear, loading, error };
}
