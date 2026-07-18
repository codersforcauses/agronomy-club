import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

export type ApiEventList = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  thumbnail: string | null;
  chapterName: string;
};

export const useEvents = (
  args?: Omit<
    UseQueryOptions<ApiEventList[], AxiosError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<ApiEventList[], AxiosError>({
    ...args,
    queryKey: ["events"],
    queryFn: () => api.get<ApiEventList[]>("/events/").then((res) => res.data),
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
