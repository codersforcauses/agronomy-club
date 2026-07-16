import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

export type ApiChapterList = {
  id: number;
  name: string;
  abbrev: string;
  logo: string | null;
  location: string;
  desc: string;
  colour: string;
};

export const useChapters = (
  args?: Omit<
    UseQueryOptions<ApiChapterList[], AxiosError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<ApiChapterList[], AxiosError>({
    ...args,
    queryKey: ["chapters"],
    queryFn: () =>
      api.get<ApiChapterList[]>("/chapters/").then((res) => res.data),
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
