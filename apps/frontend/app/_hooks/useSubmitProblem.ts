"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { scrapeProblem, submitProblem } from "@/app/services/problemClient";

import {
  successToastOptions,
  errorToastOptions,
  serverErrorToastOptions,
} from "@/app/_constants/CodeUrlInput.toastOptions";

const DEFAULT_ERROR_MESSAGE = "문제 등록 중 오류가 발생했습니다.";

export function useSubmitProblem(token: string | null) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (link: string) => {
    if (!link.trim()) {
      toast.error("문제 링크를 입력해주세요.", errorToastOptions);
      return false;
    }

    try {
      setIsLoading(true);

      const scraped = await scrapeProblem(link);
      const { title, site } = scraped;

      await submitProblem(token, scraped);

      toast.success(`문제 등록 (${site} : ${title})`, successToastOptions);
      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : DEFAULT_ERROR_MESSAGE;

      if (
        message.includes("URL") ||
        message.includes("제출된") ||
        message.includes("지원하지") ||
        message.includes("존재하지")
      ) {
        toast.error(message, errorToastOptions);
      } else {
        toast.error(message, serverErrorToastOptions);
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSubmit };
}
