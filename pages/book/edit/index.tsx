import { useRouter } from "next/router";
import type { BookProps, BookSchema } from "$server/models/book";
import type { SectionProps } from "$server/models/book/section";
import type { TopicSchema } from "$server/models/topic";
import { useSessionAtom } from "$store/session";
import BookEdit from "$templates/BookEdit";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$organisms/TopicNotFoundProblem";
import { destroyBook, updateBook, useBook } from "$utils/book";
import { pagesPath } from "$utils/$path";

export type Query = { bookId: BookSchema["id"]; context?: "books" | "link" };

function Edit({ bookId, context }: Query) {
  const query = { bookId, ...(context && { context }) };
  const { book } = useBook(bookId);
  const { isTopicEditable } = useSessionAtom();
  const router = useRouter();
  const back = () => {
    switch (context) {
      case "books":
      case "link":
        return router.push(pagesPath[context].$url());
      default:
        return router.push(pagesPath.book.$url({ query }));
    }
  };
  async function handleSubmit(props: BookProps) {
    await updateBook({ id: bookId, ...props });
    return back();
  }
  async function handleDelete({ id }: Pick<BookSchema, "id">) {
    await destroyBook(id);
    switch (context) {
      case "books":
      case "link":
        return router.push(pagesPath[context].$url());
      default:
        return router.push(pagesPath.books.$url());
    }
  }
  function handleCancel() {
    return back();
  }
  async function handleAddSection(section: SectionProps) {
    if (!book) return;
    await updateBook({
      ...book,
      sections: [...book?.sections, section],
    });
  }
  function handleTopicEditClick(topic: Pick<TopicSchema, "id" | "creator">) {
    const action = isTopicEditable(topic) ? "edit" : "generate";
    const url = pagesPath.book.edit.topic[action].$url({
      query: { ...query, topicId: topic.id },
    });
    return router.push(url);
  }
  function handleTopicNewClick() {
    return router.push(pagesPath.book.edit.topic.new.$url({ query }));
  }
  function handleBookImportClick() {
    return router.push(pagesPath.book.import.$url({ query }));
  }
  function handleTopicImportClick() {
    return router.push(pagesPath.book.topic.import.$url({ query }));
  }
  const handlers = {
    onSubmit: handleSubmit,
    onDelete: handleDelete,
    onCancel: handleCancel,
    onAddSection: handleAddSection,
    onBookImportClick: handleBookImportClick,
    onTopicImportClick: handleTopicImportClick,
    onTopicNewClick: handleTopicNewClick,
    onTopicEditClick: handleTopicEditClick,
    isTopicEditable: () => true,
  };
  if (!book) return <Placeholder />;

  return <BookEdit book={book} {...handlers} />;
}

function Router() {
  const router = useRouter();
  const bookId = Number(router.query.bookId);
  const { context }: Pick<Query, "context"> = router.query;

  if (!Number.isFinite(bookId)) return <BookNotFoundProblem />;

  return <Edit bookId={bookId} context={context} />;
}

export default Router;
