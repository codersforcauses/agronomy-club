import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ApiChapterList = {
  id: number;
  name: string;
  abbrev: string;
  logo: string | null;
  location: string;
  desc: string;
  colour: string;
};

export const useChapters = (page: number = 1, pageSize: number) => {
  return useQuery<PaginatedResponse<ApiChapterList>, AxiosError>({
    queryKey: ["chapters", page, pageSize],
    queryFn: () =>
      api
        .get<PaginatedResponse<ApiChapterList>>("/chapters/", {
          params: {
            page,
            pageSize,
          },
        })
        .then((res) => res.data),
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
