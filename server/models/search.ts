import { ContentSchema } from "./content";

export const SearchResultSchema = {
  type: "object",
  required: ["totalCount", "contents", "page", "perPage"],
  properties: {
    totalCount: { type: "integer" },
    contents: {
      type: "array",
      items: ContentSchema,
    },
    page: { type: "integer" },
    perPage: { type: "integer" },
  },
} as const;

export type SearchResultSchema = {
  totalCount: number;
  contents: Array<ContentSchema>;
  page: number;
  perPage: number;
};
