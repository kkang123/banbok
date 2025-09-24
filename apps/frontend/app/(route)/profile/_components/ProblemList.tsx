import { Problem } from "@/app/_type/problem";

interface ProblemListProps {
  date: string;
  problems: Problem[];
}

export default function ProblemList({ date, problems }: ProblemListProps) {
  return (
    <div className="mt-10 mb-10 flex justify-center">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          {date} 문제 리스트
        </h2>

        {problems.length === 0 ? (
          <p className="text-gray-500">이 날짜에 등록된 문제가 없습니다.</p>
        ) : (
          <ul className="space-y-3">
            {problems.map((p) => (
              <li
                key={p.id}
                className="rounded-md border p-3 transition hover:bg-gray-50"
              >
                <a
                  href={p.problemUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between"
                >
                  <span className="font-medium text-gray-700">{p.title}</span>
                  <span className="text-sm text-gray-400">({p.site})</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
