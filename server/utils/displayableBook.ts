import type { BookSchema } from "$server/models/book";
import type { PublicBookSchema } from "$server/models/book/public";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { IsContentEditable } from "$server/models/content";
import contentBy from "./contentBy";

export function isDisplayableBook(
  book: Pick<BookSchema, "id" | "shared" | "authors">,
  isContentEditable: IsContentEditable | undefined,
  ltiResourceLink:
    | Pick<LtiResourceLinkSchema, "bookId" | "creatorId">
    | undefined,
  publicBook?: PublicBookSchema
) {
  const linked = book.id === ltiResourceLink?.bookId;
  return book.shared || linked || isContentEditable?.(book) || publicBook;
}

export function getDisplayableBook<
  Book extends Pick<BookSchema, "id" | "shared" | "authors" | "sections">,
>(
  book: Book | undefined,
  isContentEditable: IsContentEditable | undefined,
  ltiResourceLink?: Pick<LtiResourceLinkSchema, "bookId" | "creatorId">,
  publicBook?: PublicBookSchema,
  isInstructor?: boolean | false
): Book | undefined {
  if (book === undefined) return;
  if (
    !isInstructor &&
    !isDisplayableBook(book, isContentEditable, ltiResourceLink, publicBook)
  )
    return;

  const sections = book.sections.flatMap((section) => {
    const topics = section.topics.filter(
      (topic) =>
        topic.shared ||
        contentBy(topic, { id: ltiResourceLink?.creatorId }) ||
        (publicBook && contentBy(topic, { id: publicBook.userId })) ||
        isContentEditable?.(topic) ||
        isInstructor
    );
    return topics.length > 0 ? [{ ...section, topics }] : [];
  });

  return { ...book, sections };
}
