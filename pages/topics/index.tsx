import type { TopicSchema } from "$server/models/topic";
import { useRouter } from "next/router";
import TopicsTemplate from "$templates/Topics";
import { useSessionAtom } from "$store/session";
import { pagesPath } from "$utils/$path";
import useTopics from "$utils/useTopics";
import { destroyTopic, updateTopic } from "$utils/topic";
import type { ContentAuthors } from "$types/content";

const Topics = (
  props: Omit<
    Parameters<typeof TopicsTemplate>[0],
    keyof ReturnType<typeof useTopics>
  >
) => <TopicsTemplate {...props} {...useTopics()} />;

function Index() {
  const router = useRouter();
  const { isContentEditable } = useSessionAtom();
  function refresh() {
    return router.push(pagesPath.topics.$url());
  }
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
        await updateTopic({ ...topic });
      }
    }
    return refresh();
  }
  async function handleTopicsDeleteClick(topics: TopicSchema[]) {
    for (const topic of topics) {
      if (isContentEditable(topic)) {
        await destroyTopic(topic.id);
      }
    }
    return refresh();
  }
  function handleTopicEditClick(
    topic: Pick<TopicSchema, "id"> & ContentAuthors
  ) {
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
    onTopicEditClick: handleTopicEditClick,
    onTopicNewClick: handleTopicNewClick,
  };

  return <Topics {...handlers} />;
}

export default Index;
