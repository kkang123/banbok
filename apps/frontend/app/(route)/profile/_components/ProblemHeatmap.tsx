import { useState, useEffect } from "react";
import HeatMap, { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import clsx from "clsx";

import { useAuthStore } from "@/app/_store/authStore";

import { Problem, HeatmapValue } from "@/app/_type/problem";
import { COLOR_SCALE } from "@/app/_constants/colorScale";
import {
  fetchUserData,
  fetchProblems,
  fetchProblemsByDate,
} from "@/app/api/problem";

interface ProblemHeatmapProps {
  onDateSelect: (date: string, problems: Problem[]) => void;
}

export default function ProblemHeatmap({ onDateSelect }: ProblemHeatmapProps) {
  const [data, setData] = useState<HeatmapValue[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) return;

    const loadUser = async () => {
      try {
        const data = await fetchUserData(token);
        const startYear = new Date(data.createdAt).getFullYear();
        const currentYear = new Date().getFullYear();
        const yearList = Array.from(
          { length: currentYear - startYear + 1 },
          (_, i) => startYear + i,
        );

        setYears(yearList);
        setSelectedYear(currentYear);
      } catch (error) {
        console.error("사용자 데이터 불러오기 실패:", error);
      }
    };

    loadUser();
  }, [token]);

  useEffect(() => {
    if (!token || !selectedYear) return;

    const loadProblems = async () => {
      try {
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
        console.error("❌ API 호출 에러:", err);
      }
    };

    loadProblems();
  }, [token, selectedYear]);

  const handleDayClick = async (value?: ReactCalendarHeatmapValue<string>) => {
    if (!value?.date) return;

    try {
      const result = await fetchProblemsByDate(token!, value.date);
      onDateSelect(value.date, result);
    } catch (err) {
      console.error("❌ 날짜별 문제 불러오기 실패:", err);
    }
  };

  const startDate = selectedYear
    ? new Date(`${selectedYear}-01-01`)
    : new Date();
  const endDate = selectedYear ? new Date(`${selectedYear}-12-31`) : new Date();

  return (
    <div className="mt-6 overflow-x-auto p-4 pl-20 shadow-md">
      <div className="ml-4 flex gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={clsx(
              "rounded px-3 py-1",
              selectedYear === year ? "bg-blue-500 text-white" : "bg-gray-200",
            )}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="mx-auto flex w-fit">
        <div className="mt-18 mr-2 flex flex-col gap-0.5 text-xs leading-tight text-gray-500">
          <span>일</span>
          <span>월</span>
          <span>화</span>
          <span>수</span>
          <span>목</span>
          <span>금</span>
          <span>토</span>
        </div>

        <div>
          <HeatMap
            startDate={startDate}
            endDate={endDate}
            values={data}
            classForValue={(value) => {
              if (!value) return "color-empty";
              const level = Math.min(value.count, 5);
              return COLOR_SCALE[level] ?? "color-empty";
            }}
            onClick={handleDayClick}
          />
        </div>
      </div>
    </div>
  );
}
