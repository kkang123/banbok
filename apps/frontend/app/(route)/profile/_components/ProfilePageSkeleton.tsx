import Skeleton from "@/app/_components/common/Skeleton";
import ProblemHeatmapSkeleton from "./ProblemHeatmapSkeleton";

export default function ProfilePageSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <Skeleton className="absolute top-0 left-0 z-50 flex h-15 w-full justify-between p-4" />

      <div className="mx-auto mt-20 max-w-md rounded-lg bg-white p-6 shadow-md">
        <Skeleton className="mx-auto mb-6 h-7 w-28" />

        <div className="mb-6 flex items-center gap-8 p-2">
          <Skeleton className="h-24 w-24 flex-shrink-0 rounded-full border-2 border-gray-200" />

          <div className="flex flex-col justify-center space-y-2">
            <Skeleton className="h-6 w-32" />

            <Skeleton className="h-5 w-24" />

            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        <div className="border-t pt-4">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      <div className="mt-12">
        <ProblemHeatmapSkeleton />
      </div>
    </div>
  );
}
