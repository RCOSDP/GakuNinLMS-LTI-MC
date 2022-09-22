import type { AuthorsProps } from "$server/models/authorsProps";
import type { TopicPropsWithUpload } from "$server/models/topic";

// TODO: AuthorsProps は TopicProps に統合して移行したい
export type TopicPropsWithUploadAndAuthors = TopicPropsWithUpload &
  AuthorsProps;
