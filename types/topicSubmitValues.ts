import type { AuthorsProps } from "$server/models/authorsProps";
import type { TopicProps } from "$server/models/topic";

/** トピックとして作成・更新する値 */
export type TopicSubmitValues = TopicProps &
  // TODO: AuthorsProps は TopicProps に統合して移行したい
  AuthorsProps & {
    /** アップロードするファイル */
    file?: File;
  };
