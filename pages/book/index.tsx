import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import type { BookSchema } from "$server/models/book";
import {
  usePlayerTrackerAtom,
  usePlayerTrackingAtom,
} from "$store/playerTracker";
import Book from "$templates/Book";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$templates/BookNotFoundProblem";
import { useSessionAtom } from "$store/session";
import { useBook, getBookIdByZoom } from "$utils/book";
import { useBookAtom } from "$store/book";
import { useVideoAtom } from "$store/video";
import type { TopicSchema } from "$server/models/topic";
import type { ContentAuthors } from "$server/models/content";
import { pagesPath } from "$utils/$path";
import useBookActivity from "$utils/useBookActivity";
import { useActivityTracking } from "$utils/activity";
import { useLoggerInit } from "$utils/eventLogger/loggerSessionPersister";
import logger from "$utils/eventLogger/logger";

export type Query = { bookId: BookSchema["id"]; token?: string; zoom?: number };

function Show(query: Query) {
  const router = useRouter();
  if (query.zoom) {
    void getBookIdByZoom(query.zoom)
      .then((res) => {
        void router.push(
          // @ts-expect-error 型としてはbookIdがないとエラーになるが、ダミー値を入れるとリダイレクト先urlにbookIdが入ってしまう
          pagesPath.book.$url({ query: { token: res.publicToken } })
        );
      })
      .catch((_) => {
        // nop
      });
  }

  const { session, isContentEditable } = useSessionAtom();
  // 公開URLのときもsyslogには出力する
  useLoggerInit(session);
  const { book, error } = useBook(
    query.bookId,
    isContentEditable,
    session?.ltiResourceLink,
    query.token
  );
  useBookActivity(book?.id);
  const {
    book: bookAtom,
    updateBook,
    itemIndex,
    nextItemIndex,
    itemExists,
    updateItemIndex,
  } = useBookAtom();
  useEffect(() => {
    if (book && !bookAtom) updateBook(book);
  }, [book, bookAtom, updateBook]);
  useActivityTracking();
  const { video } = useVideoAtom();
  const tracking = usePlayerTrackingAtom();
  useEffect(() => {
    const videoInstance = video.get(String(itemExists(itemIndex)?.id));
    if (!videoInstance) return;
    if (videoInstance.type === "vimeo") {
      tracking({ player: videoInstance.player, url: videoInstance.url });
    } else {
      videoInstance.player.ready(() => {
        tracking({ player: videoInstance.player });
      });
    }
  }, [video, itemExists, itemIndex, tracking]);
  const playerTracker = usePlayerTrackerAtom();
  useEffect(() => {
    if (playerTracker) logger(playerTracker);
  }, [playerTracker]);
  const handleTopicNext = useCallback(
    (index: ItemIndex = nextItemIndex) => {
      const topic = itemExists(index);
      if (!topic) return;

      playerTracker?.next(topic.id);
      updateItemIndex(index);
    },
    [playerTracker, nextItemIndex, itemExists, updateItemIndex]
  );
  const handleBookEditClick = () => {
    const action = book && isContentEditable(book) ? "edit" : "generate";
    return router.push(pagesPath.book[action].$url({ query }));
  };
  const handleOtherBookLinkClick = () => {
    return router.push(pagesPath.books.$url());
  };
  const handleTopicEditClick = (
    topic: Pick<TopicSchema, "id"> & ContentAuthors
  ) => {
    const action = isContentEditable(topic) ? "edit" : "generate";
    const url = pagesPath.book.topic[action].$url({
      query: { ...query, topicId: topic.id },
    });
    return router.push(url);
  };
  const handlers = {
    linked: book?.id === session?.ltiResourceLink?.bookId,
    onTopicEnded: handleTopicNext,
    onItemClick: handleTopicNext,
    onBookEditClick: handleBookEditClick,
    onOtherBookLinkClick: handleOtherBookLinkClick,
    onTopicEditClick: handleTopicEditClick,
  };

  if (error) return <BookNotFoundProblem />;
  if (!book) return <Placeholder />;

  return <Book book={book} index={itemIndex} {...handlers} />;
}

function Router() {
  const router = useRouter();
  const bookId = Number(router.query.bookId);
  const token = Array.isArray(router.query.token)
    ? router.query.token[0]
    : router.query.token;
  const zoom = Number(router.query.zoom);

  if (!Number.isFinite(bookId) && !token && !Number.isFinite(zoom))
    return <BookNotFoundProblem />;

  return <Show bookId={bookId} token={token} zoom={zoom} />;
}

export default Router;
