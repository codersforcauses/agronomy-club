import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

type ApiQuizList = {
  id: number;
  name: string;
  public: boolean;
  chapter: string;
  upload_date: string;
  quiz_data: object;
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
    retry: 1,
  });
};
