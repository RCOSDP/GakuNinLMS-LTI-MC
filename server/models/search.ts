import { ContentSchema } from "./content";

export const SearchResultSchema = {
  type: "object",
  required: ["contents", "page", "perPage"],
  properties: {
    contents: {
      type: "array",
      items: ContentSchema,
    },
    page: { type: "integer" },
    perPage: { type: "integer" },
  },
} as const;

export type SearchResultSchema = {
  contents: Array<ContentSchema>;
  page: number;
  perPage: number;
};
