import { outdent } from "outdent";
import Method from "$server/types/method";
import { UserParams, userParamsSchema } from "$server/validators/userParams";
import {
  PaginationProps,
  paginationPropsSchema,
} from "$server/validators/paginationProps";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import { findCreatedBooks } from "$server/utils/user";
import { userBooksSchema } from "$server/models/userBooks";

export type Query = PaginationProps;
export type Params = UserParams;

export const method: Method = {
  get: {
    summary: "作成したブックの一覧",
    description: outdent`
      利用者の作成したブックの一覧を取得します。
      教員または管理者でなければなりません。`,
    querystring: paginationPropsSchema,
    params: userParamsSchema,
    response: {
      200: userBooksSchema,
    },
  },
};

export const hooks = {
  get: { auth: [authUser, authInstructor] },
};

export async function index({
  query,
  params,
}: {
  query: Query;
  params: Params;
}) {
  const page = query.page ?? 0;
  const perPage = query.per_page ?? 50;
  const { user_id: userId } = params;
  const books = await findCreatedBooks(userId, query.sort, page, perPage);

  return {
    status: 200,
    body: { books, page, perPage },
  };
}
