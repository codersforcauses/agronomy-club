import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

export type ApiAlumni = {
  id: number;
  full_name: string;
  grad_yr: number;
  discipline: string;
  email: string;
};

export const useAlumni = (
  args?: Omit<UseQueryOptions<ApiAlumni[], AxiosError>, "queryKey" | "queryFn">,
) => {
  return useQuery<ApiAlumni[], AxiosError>({
    ...args,
    queryKey: ["alumni"],
    queryFn: () => api.get("/alumni/").then((res) => res.data),
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
