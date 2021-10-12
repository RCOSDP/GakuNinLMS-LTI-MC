import { FastifyRequest } from "fastify";
import { AuthorSchema } from "$server/models/author";
import { AuthorsProps } from "$server/validators/authorsProps";
import { TopicParams } from "$server/validators/topicParams";
import { BookParams } from "$server/validators/bookParams";
import topicExists from "$server/utils/topic/topicExists";
import bookExists from "$server/utils/book/bookExists";
import { isUsersOrAdmin } from "$server/utils/session";

/** 著者の更新 */
async function update({
  session,
  body,
  params,
}: FastifyRequest<{
  Body: AuthorsProps;
  Params: TopicParams | BookParams;
}>) {
  const found =
    "topic_id" in params
      ? await topicExists(params.topic_id)
      : await bookExists(params.book_id);

  if (!found) return { status: 404 };
  if (!isUsersOrAdmin(session, found.authors)) return { status: 403 };

  const authors = await found.updateAuthors(body);

  return {
    status: 201,
    body: authors,
  };
}

/** OpenAPI Request Body Object */
update.body = AuthorsProps;

/** OpenAPI Responses Object */
update.response = {
  201: { type: "array", items: AuthorSchema },
  403: {},
  404: {},
} as const;

export default update;
