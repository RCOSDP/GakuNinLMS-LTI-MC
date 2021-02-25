import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import type { BookSchema } from "$server/models/book";
import type { TopicProps, TopicSchema } from "$server/models/topic";
import type { VideoTrackSchema } from "$server/models/videoTrack";
import { useVideoTrackAtom } from "$store/videoTrack";
import { createTopic } from "./topic";
import { uploadVideoTrack } from "./videoTrack";
import { addTopicToBook, replaceTopicInBook } from "./book";

/** TopicNew コンポーネントのためのハンドラー生成 (要 TopicNew, ./index.tsx, ./edit.tsx) */
function useTopicNewHandlers(
  context: "books" | "link" | undefined,
  book?: BookSchema,
  targetTopic?: TopicSchema
) {
  const router = useRouter();
  const bookEditQuery = useMemo(
    () => ({
      ...(book && { bookId: book.id }),
      ...(context && { context }),
    }),
    [context, book]
  );
  const back = useCallback(
    () => router.push({ pathname: "./", query: bookEditQuery }),
    [router, bookEditQuery]
  );
  const {
    videoTracksProps,
    addVideoTrack: handleSubtitleSubmit,
    deleteVideoTrack,
  } = useVideoTrackAtom();
  const handleSubtitleDelete = useCallback(
    ({ id }: VideoTrackSchema) => deleteVideoTrack(id),
    [deleteVideoTrack]
  );
  const handleSubmit = useCallback(
    async (props: TopicProps) => {
      const topic = await createTopic(props);
      await Promise.all(
        videoTracksProps.map((vt) => uploadVideoTrack(topic.resource.id, vt))
      );
      if (book) {
        if (targetTopic) await replaceTopicInBook(book, targetTopic, topic);
        else await addTopicToBook(book, topic);
      }
      await router.replace(
        { pathname: "./edit", query: { ...bookEditQuery, topicId: topic.id } },
        undefined,
        { shallow: true }
      );
      return back();
    },
    [book, targetTopic, router, bookEditQuery, videoTracksProps, back]
  );
  const handlers = {
    onSubtitleSubmit: handleSubtitleSubmit,
    onSubtitleDelete: handleSubtitleDelete,
    onSubmit: handleSubmit,
    onCancel: back,
  };

  return handlers;
}

export default useTopicNewHandlers;
