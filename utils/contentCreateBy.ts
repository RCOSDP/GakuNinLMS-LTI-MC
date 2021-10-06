import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import type { UserSchema } from "$server/models/user";

/**
 * コンテンツの作成者の判定
 * @param content ブックかトピック
 * @param by ユーザー
 * @returns トピックの作成者がユーザーの場合: true、それ以外: false
 */
export function contentCreateBy(
  content: Pick<BookSchema, "creator"> | Pick<TopicSchema, "creator">,
  by?: Pick<UserSchema, "id">
): boolean {
  return content.creator.id === by?.id;
}

export default contentCreateBy;
