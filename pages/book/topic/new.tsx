import { useRouter } from "next/router";
import type { TopicProps } from "$server/models/topic";
import type { VideoTrackProps } from "$server/models/videoTrack";
import TopicNew from "$templates/TopicNew";
import Placeholder from "$templates/Placeholder";
import Unknown from "$templates/Unknown";
import { useAddVideoTrackAtom } from "$store/topic";
import { updateBook, useBook } from "$utils/book";
import { createTopic } from "$utils/topic";
import type {
  Query as BookEditQuery,
  EditProps as BookEditProps,
} from "../edit";
import { uploadVideoTrack } from "$utils/videoTrack";

function New({ bookId, prev }: BookEditProps) {
  const book = useBook(bookId);
  const router = useRouter();
  const [videoTracks, addVideoTrack] = useAddVideoTrackAtom();
  async function handleSubmit(props: TopicProps) {
    if (!book) return;

    const {
      id,
      resource: { id: resourceId },
    } = await createTopic(props);

    await Promise.all(
      videoTracks.map((vt) => uploadVideoTrack(resourceId, vt))
    );

    await updateBook({
      ...book,
      ltiResourceLinks: undefined,
      sections: [...book.sections, { name: null, topics: [{ id }] }],
    });

    const bookEditQuery = { bookId, ...(prev && { prev }) };
    await router.replace({
      pathname: "/book/topic/edit",
      query: { ...bookEditQuery, topicId: id },
    });
    return router.push({
      pathname: "/book/edit",
      query: bookEditQuery,
    });
  }
  function handleSubtitleSubmit(videoTrack: VideoTrackProps) {
    addVideoTrack(videoTrack);
    // FIXME: 追加された字幕が画面に反映されない不具合
  }
  async function handleSubtitleDelete() {
    // TODO: 未実装
  }

  if (!book) return <Placeholder />;

  return (
    <TopicNew
      onSubmit={handleSubmit}
      onSubtitleSubmit={handleSubtitleSubmit}
      onSubtitleDelete={handleSubtitleDelete}
    />
  );
}

function Router() {
  const router = useRouter();
  const query: BookEditQuery = router.query;
  const bookId = Number(query.bookId);

  if (!Number.isFinite(bookId))
    return (
      <Unknown header="ブックがありません">
        ブックが見つかりませんでした
      </Unknown>
    );

  return <New bookId={bookId} prev={query.prev} />;
}

export default Router;
