import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ApiEventList = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  thumbnail: string | null;
  chapterName: string;
  chapterColour: string;
  link: string | null;
};

export const useEvents = (page: number = 1, pageSize: number) => {
  return useQuery<PaginatedResponse<ApiEventList>, AxiosError>({
    queryKey: ["events", page, pageSize],
    queryFn: () =>
      api
        .get<PaginatedResponse<ApiEventList>>("/events/", {
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
