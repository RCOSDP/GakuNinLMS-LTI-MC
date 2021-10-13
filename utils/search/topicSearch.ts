import { TopicSchema } from "$server/models/topic";
import { Query } from "./query";

function getTextContent(topic: TopicSchema): string {
  let str = topic.name;
  for (const author of topic.authors) {
    if (author.name) str += ` ${author.name}`;
  }
  return str.normalize("NFKD").toLowerCase();
}

/**
 * 検索クエリーによるトピックの絞り込み
 * @param topics トピックの配列
 * @param query 検索クエリー
 * @return 絞り込まれたトピック
 */
function topicSearch(topics: TopicSchema[], query: Query): TopicSchema[] {
  return topics.filter((topic) => {
    const text = getTextContent(topic);
    const match = query.keywords.every((keyword) => text.includes(keyword));
    return match;
  });
}

export default topicSearch;
