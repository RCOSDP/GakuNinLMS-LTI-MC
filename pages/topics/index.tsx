import type { User } from "@prisma/client";
import type { TopicSchema } from "$server/models/topic";
import { useRouter } from "next/router";
import { useSessionAtom } from "$store/session";
import { useUserTopics } from "$utils/userTopics";
import Topics from "$templates/Topics";
import { pagesPath } from "$utils/$path";

function UserTopics(
  props: Omit<Parameters<typeof Topics>[0], "topics"> & { userId: User["id"] }
) {
  const userTopics = useUserTopics(props.userId);
  const topics = userTopics.data?.topics ?? [];
  return <Topics {...props} topics={topics} />;
}

function Index() {
  const router = useRouter();
  const { session } = useSessionAtom();
  const userId = session?.user?.id;
  function handleTopicEditClick({ id }: Pick<TopicSchema, "id">) {
    return router.push(pagesPath.topics.edit.$url({ query: { topicId: id } }));
  }
  function handleTopicNewClick() {
    return router.push(pagesPath.topics.new.$url());
  }
  const handlers = {
    onTopicEditClick: handleTopicEditClick,
    onTopicNewClick: handleTopicNewClick,
  };

  if (userId == null) {
    return <Topics topics={[]} {...handlers} />;
  }

  return <UserTopics userId={userId} {...handlers} />;
}

export default Index;
