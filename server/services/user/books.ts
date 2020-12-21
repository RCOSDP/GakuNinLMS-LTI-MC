import Method from "$server/types/method";
import { UserParams, userParamsSchema } from "$server/validators/userParams";
import {
  PaginationProps,
  paginationPropsSchema,
} from "$server/validators/paginationProps";
import { findWrittenBooks } from "$server/utils/user";
import { authInstructorHandler } from "$server/utils/authInstructorHandler";
import { userBooksSchema } from "$server/models/userBooks";

export type Query = PaginationProps;
export type Params = UserParams;

export const method: Method = {
  get: {
    description: "作成したブックの一覧",
    querystring: paginationPropsSchema,
    params: userParamsSchema,
    response: {
      200: userBooksSchema,
    },
  },
};

export async function get({ query, params }: { query: Query; params: Params }) {
  const page = query.page ?? 0;
  const perPage = query.per_page ?? 100;
  const { user_id: userId } = params;
  const books = await findWrittenBooks(userId, page, perPage);

  return {
    status: 200,
    body: { books, page, perPage },
  };
}

export const preHandler = authInstructorHandler;
