import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

export type ApiQuizList = {
  id: number;
  name: string;
  chapterName: string;
  upload_date: string;
};

export const useQuizzes = (
  args?: Omit<
    UseQueryOptions<ApiQuizList[], AxiosError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<ApiQuizList[], AxiosError>({
    ...args,
    queryKey: ["quizzes"],
    queryFn: () => api.get("/quizzes/").then((res) => res.data),
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
