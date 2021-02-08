import { useRouter } from "next/router";
import type { TopicProps, TopicSchema } from "$server/models/topic";
import type { VideoTrackProps } from "$server/models/videoTrack";
import TopicNew from "$templates/TopicNew";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$organisms/TopicNotFoundProblem";
import { useAddVideoTrackAtom } from "$store/topic";
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
  const [videoTracks, addVideoTrack] = useAddVideoTrackAtom();
  async function handleSubmit(props: TopicProps) {
    const topic = await createTopic(props);
    const {
      resource: { id: resourceId },
    } = topic;

    await Promise.all(
      videoTracks.map((vt) => uploadVideoTrack(resourceId, vt))
    );

    await onSubmit?.(topic);

    return edit(topic);
  }
  function handleSubtitleSubmit(videoTrack: VideoTrackProps) {
    addVideoTrack(videoTrack);
    // FIXME: 追加された字幕が画面に反映されない不具合
  }
  async function handleSubtitleDelete() {
    // TODO: 未実装
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

type NewWithBookprops = NewProps & Query;

function NewWithBook({ bookId, ...props }: NewWithBookprops) {
  const book = useBook(bookId);
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
    router.replace({
      pathname: "./edit",
      query: { ...bookEditQuery, topicId: topic.id },
    });
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
