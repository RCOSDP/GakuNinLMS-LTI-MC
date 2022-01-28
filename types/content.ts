import type { ContentSchema } from "$server/models/content";

export type ContentAuthors = Pick<ContentSchema, "authors">;

export type IsContentEditable = (content: ContentAuthors) => boolean;
