"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@/app/_components/Header/Header";
import ProfileCard from "./_components/ProfileCard";
import ProblemHeatmap from "./_components/ProblemHeatmap";
import ProblemList from "./_components/ProblemList";

import { useAuthStore } from "@/app/_store/authStore";
import { Problem } from "@/app/_type/problem";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, hasHydrated } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedProblems, setSelectedProblems] = useState<Problem[]>([]);

  useEffect(() => {
    if (hasHydrated && !isLoading && !user) {
      router.push("/login");
    }
  }, [hasHydrated, isLoading, user, router]);

  if (!hasHydrated || isLoading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  if (!user) return null;

  return (
    <>
      <Header />

      <ProfileCard user={user} />
      <ProblemHeatmap
        onDateSelect={(date, problems) => {
          setSelectedDate(date);
          setSelectedProblems(problems);
        }}
      />

      {selectedDate && (
        <ProblemList date={selectedDate} problems={selectedProblems} />
      )}
    </>
  );
}
