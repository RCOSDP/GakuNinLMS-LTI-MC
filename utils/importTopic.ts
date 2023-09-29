import type {
  BooksImportParams,
  BooksImportResult,
} from "$server/models/booksImportParams";
import { api } from "./api";
import { revalidateTopic } from "./topic";

async function importTopic(
  topicId: number,
  body: BooksImportParams
): Promise<BooksImportResult> {
  const res = await api.apiV2TopicTopicIdImportPost({ topicId, body });
  await revalidateTopic(topicId);
  return res as BooksImportResult;
}

export default importTopic;
