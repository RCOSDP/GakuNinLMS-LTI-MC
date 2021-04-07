import type { TopicSchema } from "$server/models/topic";
import { useRouter } from "next/router";
import TopicsTemplate from "$templates/Topics";
import { useSessionAtom } from "$store/session";
import { pagesPath } from "$utils/$path";
import useTopics from "$utils/useTopics";

const Topics = (
  props: Omit<
    Parameters<typeof TopicsTemplate>[0],
    keyof ReturnType<typeof useTopics>
  >
) => <TopicsTemplate {...props} {...useTopics()} />;

function Index() {
  const router = useRouter();
  const { isTopicEditable } = useSessionAtom();
  function handleTopicEditClick(topic: Pick<TopicSchema, "id" | "creator">) {
    const action = isTopicEditable(topic) ? "edit" : "generate";
    return router.push(
      pagesPath.topics[action].$url({ query: { topicId: topic.id } })
    );
  }
  function handleTopicNewClick() {
    return router.push(pagesPath.topics.new.$url({ query: {} }));
  }
  const handlers = {
    onTopicEditClick: handleTopicEditClick,
    onTopicNewClick: handleTopicNewClick,
  };

  return <Topics {...handlers} />;
}

export default Index;
