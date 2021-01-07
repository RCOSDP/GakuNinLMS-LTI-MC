import { useRouter } from "next/router";
import type { TopicProps, TopicSchema } from "$server/models/topic";
import type {
  Query as BookQuery,
  ShowProps as BookShowProps,
} from "../../book";
import Placeholder from "$templates/Placeholder";
import TopicEdit from "$templates/TopicEdit";
import { updateTopic, useTopic } from "$utils/topic";

type Query = BookQuery & {
  topicId?: string;
};

type EditProps = BookShowProps & {
  topicId: TopicSchema["id"];
};

function Edit({ topicId, bookId }: EditProps) {
  const topic = useTopic(topicId);
  const router = useRouter();
  async function handleSubmit(props: TopicProps) {
    await updateTopic({ id: topicId, ...props });
    return router.push({ pathname: "/book", query: { bookId } });
  }
  function handleSubtitleSubmit() {
    // TODO: 未実装
  }
  async function handleSubtitleDelete() {
    // TODO: 未実装
  }

  if (!topic) return <Placeholder />;

  return (
    <TopicEdit
      topic={topic}
      onSubmit={handleSubmit}
      onSubtitleSubmit={handleSubtitleSubmit}
      onSubtitleDelete={handleSubtitleDelete}
    />
  );
}

function Router() {
  const router = useRouter();
  const query: Query = router.query;
  const props = {
    bookId: Number(query.bookId),
    topicId: Number(query.topicId),
  };

  return <Edit {...props} />;
}

export default Router;
