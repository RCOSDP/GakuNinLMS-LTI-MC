import { BookSchema } from "$server/models/book";
import { TopicSchema } from "$server/models/topic";

function sharedOrEditable(
  book: BookSchema,
  isBookEditable: (book: Pick<BookSchema, "author">) => boolean
) {
  return book.shared || isBookEditable(book);
}

function getDisplayableBook(
  book: BookSchema | undefined,
  isBookEditable: (book: Pick<BookSchema, "author">) => boolean,
  isTopicEditable: (topic: Pick<TopicSchema, "creator">) => boolean
): BookSchema | undefined {
  if (book === undefined) return;
  if (!sharedOrEditable(book, isBookEditable)) return;

  const sections = book.sections.flatMap((section) => {
    const topics = section.topics.filter(
      (topic) => topic.shared || isTopicEditable(topic)
    );
    return topics.length > 0 ? [{ ...section, topics }] : [];
  });

  return { ...book, sections };
}

export default getDisplayableBook;
