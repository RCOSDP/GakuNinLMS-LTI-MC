import type { BookSchema } from "$server/models/book";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { IsContentEditable } from "$server/models/content";
import contentBy from "./contentBy";

function isDisplayableBook(
  book: BookSchema,
  ltiResourceLink:
    | Pick<LtiResourceLinkSchema, "bookId" | "creatorId">
    | undefined,
  isContentEditable: IsContentEditable
) {
  const linked = book.id === ltiResourceLink?.bookId;
  return book.shared || linked || isContentEditable(book);
}

function getDisplayableBook(
  book: BookSchema | undefined,
  isContentEditable: IsContentEditable,
  ltiResourceLink?: Pick<LtiResourceLinkSchema, "bookId" | "creatorId">
): BookSchema | undefined {
  if (book === undefined) return;
  if (!isDisplayableBook(book, ltiResourceLink, isContentEditable)) return;

  const sections = book.sections.flatMap((section) => {
    const topics = section.topics.filter(
      (topic) =>
        topic.shared ||
        contentBy(topic, { id: ltiResourceLink?.creatorId }) ||
        isContentEditable(topic)
    );
    return topics.length > 0 ? [{ ...section, topics }] : [];
  });

  return { ...book, sections };
}

export default getDisplayableBook;
