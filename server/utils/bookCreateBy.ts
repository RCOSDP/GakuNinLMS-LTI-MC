import type { BookSchema } from "$server/models/book";
import type { UserSchema } from "$server/models/user";

/**
 * ブックの作成者の判定
 * @param book ブック
 * @param by ユーザー
 * @returns ブックの作成者がユーザーの場合: true、それ以外: false
 */
function bookCreateBy(
  book: Pick<BookSchema, "author">,
  by?: Pick<UserSchema, "id">
): boolean {
  return book.author.id === by?.id;
}

export default bookCreateBy;
