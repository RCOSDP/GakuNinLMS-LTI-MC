import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { BookSchema } from "$server/models/book";
import { useNextItemIndexAtom } from "$store/book";
import { usePlayerTrackerAtom } from "$store/playerTracker";
import Book from "$templates/Book";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$organisms/BookNotFoundProblem";
import { useSessionAtom } from "$store/session";
import { useBook } from "$utils/book";
import { TopicSchema } from "$server/models/topic";
import { pagesPath } from "$utils/$path";
import logger from "$utils/eventLogger/logger";

export type Query = { bookId: BookSchema["id"] };

function Show(query: Query) {
  const { session, isInstructor } = useSessionAtom();
  const book = useBook(query.bookId);
  const [index, nextItemIndex] = useNextItemIndexAtom();
  const playerTracker = usePlayerTrackerAtom();
  useEffect(() => {
    if (playerTracker) logger(playerTracker);
  }, [playerTracker]);
  // NOTE: playerTrackerが更新され続けるのでVideoコンポーネントの再描画を防ぐ
  const handleTopicEnded = useCallback(() => nextItemIndex(), [nextItemIndex]);
  const handleItemClick = ([sectionIndex, topicIndex]: ItemIndex) => {
    const topicExists = book?.sections[sectionIndex]?.topics[topicIndex];
    if (topicExists) playerTracker?.next(topicExists.id);
    nextItemIndex([sectionIndex, topicIndex]);
  };
  const router = useRouter();
  const handleBookEditClick = () => {
    return router.push(pagesPath.book.edit.$url({ query }));
  };
  const handleBookLinkClick = () => router.push(pagesPath.link.$url());
  const handleTopicEditClick = ({ id }: Pick<TopicSchema, "id">) => {
    return router.push(
      pagesPath.book.topic.edit.$url({
        query: {
          bookId: query.bookId,
          topicId: id,
        },
      })
    );
  };
  const handlers = {
    editable: isInstructor,
    linked: query.bookId === session?.ltiResourceLink?.bookId,
    onTopicEnded: handleTopicEnded,
    onItemClick: handleItemClick,
    onBookEditClick: handleBookEditClick,
    onBookLinkClick: handleBookLinkClick,
    onTopicEditClick: handleTopicEditClick,
  };

  if (!book) return <Placeholder />;

  return <Book book={book} index={index} {...handlers} />;
}

function Router() {
  const router = useRouter();
  const bookId = Number(router.query.bookId);

  if (!Number.isFinite(bookId)) return <BookNotFoundProblem />;

  return <Show bookId={bookId} />;
}

export default Router;
