import { useEffect } from "react";
import { useRouter } from "next/router";
import { BookSchema } from "$server/models/book";
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
  const {
    book,
    itemIndex,
    itemExists,
    updateItemIndex,
    nextItemIndex,
  } = useBook(query.bookId);
  const playerTracker = usePlayerTrackerAtom();
  useEffect(() => {
    if (playerTracker) logger(playerTracker);
  }, [playerTracker]);
  const handleItemClick = (index: ItemIndex) => {
    const topic = itemExists(index);
    if (topic) playerTracker?.next(topic.id);
    updateItemIndex(index);
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
    onTopicEnded: nextItemIndex,
    onItemClick: handleItemClick,
    onBookEditClick: handleBookEditClick,
    onBookLinkClick: handleBookLinkClick,
    onTopicEditClick: handleTopicEditClick,
  };

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
