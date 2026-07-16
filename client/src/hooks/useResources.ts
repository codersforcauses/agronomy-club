import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

export type ApiResourceTypeTag = {
  id: number;
  name: string;
  color: string;
};

export type ApiResource = {
  id: number;
  chapter_name: string;
  name: string;
  link: string;
  upload_date: string;
  type_tags: ApiResourceTypeTag[];
};

export function useResource(tags?: number[]) {
  return useQuery<ApiResource[], AxiosError>({
    queryKey: ["resources", { tags }],
    queryFn: async () => {
      const response = await api.get<ApiResource[]>("/resources/", {
        params: {
          tags: tags?.length ? tags.join(",") : undefined,
        },
      });
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
