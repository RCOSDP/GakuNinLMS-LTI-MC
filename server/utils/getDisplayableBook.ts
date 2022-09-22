import type { BookSchema } from "$server/models/book";
import type { PublicBookSchema } from "$server/models/book/public";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { IsContentEditable } from "$server/models/content";
import contentBy from "./contentBy";

function isDisplayableBook(
  book: BookSchema,
  ltiResourceLink:
    | Pick<LtiResourceLinkSchema, "bookId" | "creatorId">
    | undefined,
  isContentEditable: IsContentEditable,
  publicBook?: PublicBookSchema
) {
  const linked = book.id === ltiResourceLink?.bookId;
  return book.shared || linked || isContentEditable(book) || publicBook;
}

function getDisplayableBook(
  book: BookSchema | undefined,
  isContentEditable: IsContentEditable,
  ltiResourceLink?: Pick<LtiResourceLinkSchema, "bookId" | "creatorId">,
  publicBook?: PublicBookSchema
): BookSchema | undefined {
  if (book === undefined) return;
  if (!isDisplayableBook(book, ltiResourceLink, isContentEditable, publicBook))
    return;

  const sections = book.sections.flatMap((section) => {
    const topics = section.topics.filter(
      (topic) =>
        topic.shared ||
        contentBy(topic, { id: ltiResourceLink?.creatorId }) ||
        (publicBook && contentBy(topic, { id: publicBook.userId })) ||
        isContentEditable(topic)
    );
    return topics.length > 0 ? [{ ...section, topics }] : [];
  });

  return { ...book, sections };
}

export default getDisplayableBook;
