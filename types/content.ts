import type { TopicSchema } from "$server/models/topic";
import type { BookSchema } from "$server/models/book";

// TODO: ContentSchema に移行したい
export type Content = TopicSchema | BookSchema;

export type ContentAuthors = Pick<Content, "authors">;

export type IsContentEditable = (content: ContentAuthors) => boolean;
