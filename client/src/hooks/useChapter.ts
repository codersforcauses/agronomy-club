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
  chapter: number;
  chapter_name: string;
  name: string;
  link: string;
  upload_date: string;
  type_tags: ApiResourceTypeTag[];
};

export type ApiCommitteeMember = {
  id: number;
  full_name: string;
  email: string;
  position: "pres" | "vpres" | "sec" | "treas" | "mark" | "ocm";
};
export type ApiChapter = {
  id: number;
  name: string;
  abbrev: string;
  logo: string | null;
  location: string;
  desc: string;
  email: string;
  colour: string;
  resources: ApiResource[];
  committee: ApiCommitteeMember[];
};

/**
 * Normalizes Next.js router query parameter to a single string ID.
 * Handles string, number and array formats from dynamic routes.
 */
function normalizeChapterId(
  chapterId: string | number | string[] | undefined,
): string | undefined {
  if (!chapterId) return undefined;
  if (typeof chapterId === "number") return String(chapterId);
  return typeof chapterId === "string" ? chapterId : chapterId[0];
}

/**
 * Custom hook to fetch a single chapter by ID.
 *
 * @param chapterId - Chapter ID from Next.js router query (can be string, number, string[], or undefined)
 * @returns React Query result with the serialized chapter data
 *
 * @example
 * ```tsx
 * const { id } = useParams();
 * const { data: chapter, isPending, error } = useChapter(id);
 * ```
 */
export function useChapter(
  chapterId: string | number | string[] | undefined,
  committee: "exec" | "all",
) {
  const id = normalizeChapterId(chapterId);

  return useQuery<ApiChapter, AxiosError>({
    queryKey: ["chapters", id, committee],
    queryFn: async () => {
      if (!id) {
        throw new Error("Chapter ID is required");
      }
      const response = await api.get<ApiChapter>(`/chapters/${id}/`, {
        params: {
          committee,
        },
      });
      return response.data;
    },
    enabled: !!id,
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}
