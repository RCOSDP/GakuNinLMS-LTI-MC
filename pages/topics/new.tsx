import { useRouter } from "next/router";
import type { TopicProps, TopicSchema } from "$server/models/topic";
import type {
  VideoTrackProps,
  VideoTrackSchema,
} from "$server/models/videoTrack";
import TopicNew from "$templates/TopicNew";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$organisms/TopicNotFoundProblem";
import { useVideoTrackAtom } from "$store/videoTrack";
import { updateBook, useBook } from "$utils/book";
import { createTopic } from "$utils/topic";
import type { Query as BookEditQuery } from "$pages/book/edit";
import { uploadVideoTrack } from "$utils/videoTrack";

export type Query = null | BookEditQuery;

type NewProps = {
  edit(topic: TopicSchema): Promise<unknown>;
  back(): Promise<unknown>;
  onSubmit?(topic: TopicSchema): Promise<void>;
};

function New({ edit, back, onSubmit }: NewProps) {
  const {
    videoTracksProps,
    addVideoTrack,
    deleteVideoTrack,
  } = useVideoTrackAtom();
  async function handleSubmit(props: TopicProps) {
    const topic = await createTopic(props);
    const {
      resource: { id: resourceId },
    } = topic;

    await Promise.all(
      videoTracksProps.map((vt) => uploadVideoTrack(resourceId, vt))
    );

    await onSubmit?.(topic);

    await edit(topic);
    return back();
  }
  function handleSubtitleSubmit(videoTrack: VideoTrackProps) {
    addVideoTrack(videoTrack);
  }
  function handleSubtitleDelete({ id }: VideoTrackSchema) {
    deleteVideoTrack(id);
  }
  function handleCancel() {
    return back();
  }
  const handlers = {
    onSubmit: handleSubmit,
    onSubtitleSubmit: handleSubtitleSubmit,
    onSubtitleDelete: handleSubtitleDelete,
    onCancel: handleCancel,
  };

  return <TopicNew {...handlers} />;
}

type NewWithBookProps = NewProps & Query;

function NewWithBook({ bookId, ...props }: NewWithBookProps) {
  const { book } = useBook(bookId);
  async function handleSubmit({ id }: Pick<TopicSchema, "id">) {
    if (!book) return;
    await updateBook({
      ...book,
      ltiResourceLinks: undefined,
      sections: [...book.sections, { name: null, topics: [{ id }] }],
    });
  }

  if (!book) return <Placeholder />;

  return <New {...props} onSubmit={handleSubmit} />;
}

function Router() {
  const router = useRouter();
  const bookId = router.query.bookId && Number(router.query.bookId);
  const { context }: Pick<BookEditQuery, "context"> = router.query;
  const bookEditQuery = {
    ...(bookId && { bookId }),
    ...(context && { context }),
  };
  const edit = (topic: TopicSchema) =>
    router.replace(
      {
        pathname: "./edit",
        query: { ...bookEditQuery, topicId: topic.id },
      },
      undefined,
      { shallow: true }
    );
  const back = () => router.push({ pathname: "./", query: bookEditQuery });

  if ("bookId" in bookEditQuery && !Number.isFinite(bookId)) {
    return <BookNotFoundProblem />;
  }
  if ("bookId" in bookEditQuery) {
    return <NewWithBook edit={edit} back={back} {...bookEditQuery} />;
  }
  return <New edit={edit} back={back} />;
}

export default Router;
