import HeatMap, { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import clsx from "clsx";

import { useAuthStore } from "@/app/_store/authStore";
import { useProblems } from "@/app/_hooks/useProblems";

import { Problem } from "@/app/_type/problem";
import { COLOR_SCALE } from "@/app/_constants/colorScale";

interface ProblemHeatmapProps {
  onDateSelect: (date: string, problems: Problem[]) => void;
}

export default function ProblemHeatmap({ onDateSelect }: ProblemHeatmapProps) {
  const token = useAuthStore((state) => state.token);
  const {
    years,
    selectedYear,
    setSelectedYear,
    data,
    loading,
    error,
    fetchByDate,
  } = useProblems(token);

  const handleDayClick = async (value?: ReactCalendarHeatmapValue<string>) => {
    if (!value?.date || !token) return;
    const result = await fetchByDate(token, value.date);
    onDateSelect(value.date, result);
  };

  const startDate = selectedYear
    ? new Date(`${selectedYear}-01-01`)
    : new Date();
  const endDate = selectedYear ? new Date(`${selectedYear}-12-31`) : new Date();

  return (
    <div className="mt-6 overflow-x-auto p-4 pl-20 shadow-md">
      {loading && <p className="text-gray-500">데이터 불러오는 중...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mx-auto flex w-fit">
        <div className="my-auto flex h-full flex-col justify-center space-y-2 p-4 pl-0">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={clsx(
                "rounded-full px-4 py-1 text-sm font-medium transition-colors",
                selectedYear === year
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              {year}
            </button>
          ))}
        </div>

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
