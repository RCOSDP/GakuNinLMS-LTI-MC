import { useRouter } from "next/router";
import type { TopicProps, TopicSchema } from "$server/models/topic";
import type {
  Query as BookQuery,
  ShowProps as BookShowProps,
} from "../../book";
import Placeholder from "$templates/Placeholder";
import TopicEdit from "$templates/TopicEdit";
import { useBook } from "$utils/book";
import { destroyTopic, updateTopic, useTopic } from "$utils/topic";
import { updateBook } from "$utils/book";

type Query = BookQuery & {
  topicId?: string;
};

type EditProps = BookShowProps & {
  topicId: TopicSchema["id"];
};

function Edit({ bookId, topicId }: EditProps) {
  const book = useBook(bookId);
  const topic = useTopic(topicId);
  const router = useRouter();
  function backToBook() {
    return router.push({ pathname: "/book", query: { bookId } });
  }
  async function handleSubmit(props: TopicProps) {
    await updateTopic({ id: topicId, ...props });
    return backToBook();
  }
  async function handleDelete({ id: topicId }: Pick<TopicSchema, "id">) {
    if (!book) return;
    await updateBook({
      ...book,
      ltiResourceLinks: undefined,
      sections: book?.sections?.map((section) => ({
        ...section,
        topics: section.topics.filter(({ id }) => id !== topicId),
      })),
    });
    await destroyTopic(topicId);
    return backToBook();
  }
  function handleSubtitleSubmit() {
    // TODO: 未実装
  }
  async function handleSubtitleDelete() {
    // TODO: 未実装
  }
  const handlers = {
    onSubmit: handleSubmit,
    onDelete: handleDelete,
    onSubtitleSubmit: handleSubtitleSubmit,
    onSubtitleDelete: handleSubtitleDelete,
  };

  if (!book) return <Placeholder />;
  if (!topic) return <Placeholder />;

  return <TopicEdit topic={topic} {...handlers} />;
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
