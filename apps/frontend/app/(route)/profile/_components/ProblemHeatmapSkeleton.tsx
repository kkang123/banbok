import Skeleton from "@/app/_components/common/Skeleton";

export default function ProblemHeatmapSkeleton() {
  return (
    <div className="mt-6 overflow-x-auto p-4 shadow-md">
      <div className="mb-2 ml-28 grid grid-cols-12 text-sm text-gray-500">
        {[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].map((month) => (
          <span key={month} className="text-center">
            {month}
          </span>
        ))}
      </div>

      <div className="mx-auto flex w-fit">
        <div className="my-auto flex h-full flex-col justify-center space-y-2 p-4 pl-0">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-7 w-14 rounded-full" />
          ))}
        </div>

        <div className="mr-2 flex flex-col gap-1 text-xs leading-tight text-gray-500">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="grid grid-cols-53 gap-1">
          {[...Array(365)].map((_, i) => (
            <Skeleton key={i} className="h-3 w-3 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
