import type { UserSchema } from "$server/models/user";
import type { ContentAuthors } from "$types/content";

/**
 * コンテンツの著者の判定
 * @param content ブックかトピック
 * @param by ユーザー
 * @returns コンテンツ著者にユーザーが含まれる場合: true、それ以外: false
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
