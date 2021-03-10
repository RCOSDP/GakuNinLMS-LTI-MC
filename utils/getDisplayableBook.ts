import { BookSchema } from "$server/models/book";
import { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import { TopicSchema } from "$server/models/topic";

function isDisplayableBook(
  book: BookSchema,
  ltiResourceLink:
    | Pick<LtiResourceLinkSchema, "bookId" | "authorId">
    | undefined,
  isBookEditable: (book: Pick<BookSchema, "author">) => boolean
) {
  const linked = book.id === ltiResourceLink?.bookId;
  return book.shared || linked || isBookEditable(book);
}

function getDisplayableBook(
  book: BookSchema | undefined,
  isBookEditable: (book: Pick<BookSchema, "author">) => boolean,
  isTopicEditable: (topic: Pick<TopicSchema, "creator">) => boolean,
  ltiResourceLink?: Pick<LtiResourceLinkSchema, "bookId" | "authorId">
): BookSchema | undefined {
  if (book === undefined) return;
  if (!isDisplayableBook(book, ltiResourceLink, isBookEditable)) return;

  const sections = book.sections.flatMap((section) => {
    const topics = section.topics.filter(
      (topic) =>
        topic.shared ||
        topic.creator.id === ltiResourceLink?.authorId ||
        isTopicEditable(topic)
    );
    return topics.length > 0 ? [{ ...section, topics }] : [];
  });

  return { ...book, sections };
}

export default getDisplayableBook;
