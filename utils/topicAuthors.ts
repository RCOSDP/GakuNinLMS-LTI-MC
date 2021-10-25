import { mutate } from "swr";
import type { TopicSchema } from "$server/models/topic";
import type { AuthorsProps } from "$server/validators/authorsProps";
import type { AuthorSchema } from "$server/models/author";
import { api } from "./api";

const key = "/api/v2/topic/{topic_id}/authors";

export async function updateTopicAuthors({
  id,
  ...body
}: AuthorsProps & { id: TopicSchema["id"] }): Promise<AuthorSchema[]> {
  const res = api.apiV2TopicTopicIdAuthorsPut({ topicId: id, body });
  await mutate([key, id], res);
  return res;
}
