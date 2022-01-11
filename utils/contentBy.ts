import type { UserSchema } from "$server/models/user";
import type { ContentAuthors } from "$types/content";

/**
 * コンテンツの作成者の判定
 * @param content ブックかトピック
 * @param by ユーザー
 * @returns コンテンツ作成者にユーザーが含まれる場合: true、それ以外: false
 */
export function contentBy(
  content: ContentAuthors,
  by?: Partial<Pick<UserSchema, "id">>
): boolean {
  return (
    by?.id != null && content.authors.some((author) => author.id === by.id)
  );
}

export default contentBy;
