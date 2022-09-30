import type { TopicSchema } from "$server/models/topic";
import { useRouter } from "next/router";
import TopicsTemplate from "$templates/Topics";
import { useSessionAtom } from "$store/session";
import { pagesPath } from "$utils/$path";
import useTopics from "$utils/useTopics";
import { destroyTopic, updateTopic } from "$utils/topic";
import { useSearchAtom } from "$store/search";
import { revalidateContents } from "$utils/useContents";
import { useState } from "react";
import type { OembedSchema } from "$server/models/oembed";

const Topics = (
  props: Omit<
    Parameters<typeof TopicsTemplate>[0],
    keyof ReturnType<typeof useTopics>
  >
) => <TopicsTemplate {...props} {...useTopics()} />;

function Index() {
  const router = useRouter();
  const { isContentEditable } = useSessionAtom();
  const { query } = useSearchAtom();
  async function handleBookNewClick(topics: TopicSchema[]) {
    const ids = topics.map(({ id }) => id);
    if (!ids || !ids.length) return;

    return router.push(
      pagesPath.book.new.$url({ query: { context: "topics", topics: ids } })
    );
  }
  async function handleTopicsShareClick(
    topics: TopicSchema[],
    shared: boolean
  ) {
    for (const topic of topics) {
      if (isContentEditable(topic) && topic.shared != shared) {
        topic.shared = shared;
        await updateTopic({
          id: topic.id,
          provider: "",
          wowzaBaseUrl: "",
          fileName: "",
          fileContent: "",
          topic,
        });
      }
    }
    await revalidateContents(query);
  }
  async function handleTopicsDeleteClick(topics: TopicSchema[]) {
    for (const topic of topics) {
      if (isContentEditable(topic)) {
        await destroyTopic(topic.id);
      }
    }
    await revalidateContents(query);
  }
  const [thumbnailUrl, setThumbnailUrl] = useState<
    OembedSchema["thumbnail_url"] | undefined
  >(undefined);
  function handleSetThumbnailUrl(
    thumbnailUrl: OembedSchema["thumbnail_url"] | undefined
  ) {
    setThumbnailUrl(thumbnailUrl);
  }
  function onContentEditClick(topic: Pick<TopicSchema, "id" | "authors">) {
    const action = isContentEditable(topic) ? "edit" : "generate";
    return router.push(
      pagesPath.topics[action].$url({ query: { topicId: topic.id } })
    );
  }
  function handleTopicNewClick() {
    return router.push(pagesPath.topics.new.$url({ query: {} }));
  }
  const handlers = {
    onBookNewClick: handleBookNewClick,
    onTopicsShareClick: handleTopicsShareClick,
    onTopicsDeleteClick: handleTopicsDeleteClick,
    onContentEditClick,
    onTopicNewClick: handleTopicNewClick,
    handleSetThumbnailUrl,
  };

  return <Topics {...handlers} thumbnailUrl={thumbnailUrl} />;
}

export default Index;
