import { BookSchema } from "$server/models/book";
import { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import { TopicSchema } from "$server/models/topic";

function isDisplayableBook(
  book: BookSchema,
  ltiResourceLink:
    | Pick<LtiResourceLinkSchema, "bookId" | "creatorId">
    | undefined,
  isContentEditable: (content: Pick<BookSchema, "creator">) => boolean
) {
  const linked = book.id === ltiResourceLink?.bookId;
  return book.shared || linked || isContentEditable(book);
}

function getDisplayableBook(
  book: BookSchema | undefined,
  isContentEditable: (
    content: Pick<BookSchema, "creator"> | Pick<TopicSchema, "creator">
  ) => boolean,
  ltiResourceLink?: Pick<LtiResourceLinkSchema, "bookId" | "creatorId">
): BookSchema | undefined {
  if (book === undefined) return;
  if (!isDisplayableBook(book, ltiResourceLink, isContentEditable)) return;

  const sections = book.sections.flatMap((section) => {
    const topics = section.topics.filter(
      (topic) =>
        topic.shared ||
        topic.creator.id === ltiResourceLink?.creatorId ||
        isContentEditable(topic)
    );
    return topics.length > 0 ? [{ ...section, topics }] : [];
  });

  return { ...book, sections };
}

export default getDisplayableBook;
