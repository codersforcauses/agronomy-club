import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

export type ApiResourceTypeTag = {
  id: number;
  name: resourceType;
  lucide_name: string;
};

export const resourceTypes = [
  "Guide",
  "Template",
  "Calculator",
  "Video",
  "Lecture Deck",
  "Data Sheet",
  "Lab Protocol",
  "Case Study",
  "Video Game",
  "Simulation",
  "Database",
  "Article",
  "Tool/Software",
  "Website",
] as const;

export type resourceType = (typeof resourceTypes)[number];

export const typenameToId: Record<resourceType, number> = {
  Guide: 1,
  Template: 2,
  Calculator: 3,
  Video: 4,
  "Lecture Deck": 5,
  "Data Sheet": 6,
  "Lab Protocol": 7,
  "Case Study": 8,
  "Video Game": 9,
  Simulation: 10,
  Database: 11,
  Article: 12,
  "Tool/Software": 13,
  Website: 14,
};

/*
"compass",
  "layout-template",
  "calculator",
  "video",
  "presentation",
  "file-spreadsheet",
  "flask-conical",
  "file-search",
  "gamepad-2",
  "boxes",
  "database",
  "file-text",
  "wrench",
  "globe",*/

export type ApiResource = {
  id: number;
  chapter_name: string;
  name: string;
  link: string;
  upload_date: string;
  type_tags: ApiResourceTypeTag[];
  chapter_colour: string;
};

export function useResources(tags?: number[]) {
  return useQuery<ApiResource[], AxiosError>({
    queryKey: ["resources", tags],
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
