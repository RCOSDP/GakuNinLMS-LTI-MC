import { useRouter } from "next/router";
import type { BookSchema } from "$server/models/book";
import type { BookPropsWithSubmitOptions } from "$types/bookPropsWithSubmitOptions";
import type { SectionProps } from "$server/models/book/section";
import type { TopicSchema } from "$server/models/topic";
import { useSessionAtom } from "$store/session";
import BookEdit from "$templates/BookEdit";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$templates/TopicNotFoundProblem";
import { destroyBook, updateBook, useBook } from "$utils/book";
import { pagesPath } from "$utils/$path";
import useBookLinkHandler from "$utils/useBookLinkHandler";

export type Query = { bookId: BookSchema["id"]; context?: "books" };

function Edit({ bookId, context }: Query) {
  const query = { bookId, ...(context && { context }) };
  const { session, isBookEditable, isTopicEditable } = useSessionAtom();
  const { book, error } = useBook(bookId, isBookEditable, isTopicEditable);
  const router = useRouter();
  const handleBookLink = useBookLinkHandler();
  const back = () => {
    switch (context) {
      case "books":
        return router.push(pagesPath[context].$url());
      default:
        return router.push(pagesPath.book.$url({ query }));
    }
  };
  async function handleSubmit({
    submitWithLink,
    ...props
  }: BookPropsWithSubmitOptions) {
    await updateBook({
      id: bookId,
      ...props,
      sections: props.sections?.filter((section) => section.topics.length > 0),
    });
    if (submitWithLink) await handleBookLink({ id: bookId });
    return back();
  }
  async function handleDelete({ id }: Pick<BookSchema, "id">) {
    await destroyBook(id);
    switch (context) {
      case "books":
        return router.push(pagesPath[context].$url());
      default:
        return router.push(pagesPath.books.$url());
    }
  }
  function handleCancel() {
    return back();
  }
  async function handleSectionsUpdate(sections: SectionProps[]) {
    if (!book) return;
    await updateBook({
      ...book,
      sections: sections.filter((section) => section.topics.length > 0),
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
    linked: bookId === session?.ltiResourceLink?.bookId,
    onSubmit: handleSubmit,
    onDelete: handleDelete,
    onCancel: handleCancel,
    onSectionsUpdate: handleSectionsUpdate,
    onBookImportClick: handleBookImportClick,
    onTopicImportClick: handleTopicImportClick,
    onTopicNewClick: handleTopicNewClick,
    onTopicEditClick: handleTopicEditClick,
    isTopicEditable: () => true,
  };

  if (error) return <BookNotFoundProblem />;
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
