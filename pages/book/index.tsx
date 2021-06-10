import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { BookSchema } from "$server/models/book";
import { usePlayerTrackerAtom } from "$store/playerTracker";
import Book from "$templates/Book";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$organisms/BookNotFoundProblem";
import { useSessionAtom } from "$store/session";
import { updateLtiResourceLink } from "$utils/ltiResourceLink";
import { useBook } from "$utils/book";
import { TopicSchema } from "$server/models/topic";
import { pagesPath } from "$utils/$path";
import { useActivityTracking } from "$utils/activity";
import getLtiResourceLink from "$utils/getLtiResourceLink";
import logger from "$utils/eventLogger/logger";

export type Query = { bookId: BookSchema["id"] };

function Show(query: Query) {
  const { session, isBookEditable, isTopicEditable } = useSessionAtom();
  const {
    book,
    itemIndex,
    nextItemIndex,
    itemExists,
    updateItemIndex,
    error,
  } = useBook(
    query.bookId,
    isBookEditable,
    isTopicEditable,
    session?.ltiResourceLink
  );
  useActivityTracking();
  const playerTracker = usePlayerTrackerAtom();
  useEffect(() => {
    if (playerTracker) logger(playerTracker);
  }, [playerTracker]);
  const handleTopicNext = useCallback(
    (index: ItemIndex = nextItemIndex) => {
      const topic = itemExists(index);
      if (topic) playerTracker?.next(topic.id);
      updateItemIndex(index);
    },
    [playerTracker, nextItemIndex, itemExists, updateItemIndex]
  );
  const router = useRouter();
  const handleBookEditClick = () => {
    const action = book && isBookEditable(book) ? "edit" : "generate";
    return router.push(pagesPath.book[action].$url({ query }));
  };
  const handleBookLinkClick = async (book: Pick<BookSchema, "id">) => {
    const ltiResourceLink = getLtiResourceLink(session);
    if (ltiResourceLink == null) return;
    const bookId = book.id;
    await updateLtiResourceLink({ ...ltiResourceLink, bookId });
    return router.push(pagesPath.book.$url({ query: { bookId } }));
  };
  const handleOtherBookLinkClick = () => {
    return router.push(pagesPath.books.$url());
  };
  const handleTopicEditClick = (topic: Pick<TopicSchema, "id" | "creator">) => {
    const action = isTopicEditable(topic) ? "edit" : "generate";
    const url = pagesPath.book.topic[action].$url({
      query: { ...query, topicId: topic.id },
    });
    return router.push(url);
  };
  const handlers = {
    linked: query.bookId === session?.ltiResourceLink?.bookId,
    onTopicEnded: handleTopicNext,
    onItemClick: handleTopicNext,
    onBookEditClick: handleBookEditClick,
    onBookLinkClick: handleBookLinkClick,
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

  if (!Number.isFinite(bookId)) return <BookNotFoundProblem />;

  return <Show bookId={bookId} />;
}

export default Router;
