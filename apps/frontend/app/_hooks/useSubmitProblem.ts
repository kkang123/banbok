"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { scrapeProblem, submitProblem } from "@/app/services/problemClient";

import {
  successToastOptions,
  errorToastOptions,
} from "@/app/_constants/CodeUrlInput.toastOptions";

export function useSubmitProblem(token: string | null) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (link: string) => {
    if (!link.trim()) return;

    try {
      setIsLoading(true);

      const scraped = await scrapeProblem(link);
      const { title, site } = scraped;

      await submitProblem(token, scraped);

      toast.success(`문제 등록 (${site} : ${title})`, successToastOptions);
      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "서버 요청 중 오류가 발생했습니다.";
      toast.error(message, errorToastOptions);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSubmit };
}
