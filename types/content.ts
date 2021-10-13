import { TopicSchema } from "$server/models/topic";
import { BookSchema } from "$server/models/book";

export type Content = TopicSchema | BookSchema;

export type ContentAuthors = Pick<Content, "authors">;

export type IsContentEditable = (content: ContentAuthors) => boolean;
