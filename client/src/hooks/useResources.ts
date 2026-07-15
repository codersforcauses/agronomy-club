import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

export type ApiResource = {
  id: number;
  chapter_name: string;
  name: string;
  link: string;
  upload_date: string;
  type_tags?: {
    id: number;
    name: string;
    color: string;
  };
};

export function useResource() {
  return useQuery<ApiResource[], AxiosError>({
    queryKey: ["resources"],
    queryFn: async () => {
      const response = await api.get<ApiResource[]>("/resources/");
      return response.data;
    },
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}
