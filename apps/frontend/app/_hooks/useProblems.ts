"use client";

import { useState, useEffect } from "react";

import { HeatmapValue } from "@/app/_type/problem";

import { fetchProblems } from "@/app/api/problem";

export function useProblems(token: string | null, selectedYear: number | null) {
  const [data, setData] = useState<HeatmapValue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !selectedYear) return;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchProblems(token);
        const mapped = result.reduce<HeatmapValue[]>((acc, item) => {
          const date = item.createdAt.split("T")[0];
          const existing = acc.find((d) => d.date === date);
          if (existing) existing.count++;
          else acc.push({ date, count: 1 });
          return acc;
        }, []);
        setData(mapped);
      } catch (err) {
        setError("문제 데이터를 불러오는 중 오류 발생");
        console.error("문제 데이터 불러오는 과정에서 오류 발생", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token, selectedYear]);

  return { data, loading, error };
}
