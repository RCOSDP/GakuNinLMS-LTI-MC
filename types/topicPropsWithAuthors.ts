import type { AuthorsProps } from "$server/models/authorsProps";
import type { TopicProps } from "$server/models/topic";

// TODO: AuthorsProps は TopicProps に統合して移行したい
export type TopicPropsWithAuthors = TopicProps & AuthorsProps;
