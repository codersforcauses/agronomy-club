// NOTE: This file is currently being unused as the set of resource type tags is currently fixed (unchangeable, read-only) in the backend
// This file can be used in the future if the resource type tags become dynamic

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

export type ApiResourceTypeTag = {
  id: number;
  name: string;
  lucide_name: string;
};

export function useResourceTags(tags?: number[]) {
  return useQuery<ApiResourceTypeTag[], AxiosError>({
    queryKey: ["resource-type-tags"],
    queryFn: async () => {
      const response = await api.get<ApiResourceTypeTag[]>(
        "/resource-type-tags/",
      );
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
