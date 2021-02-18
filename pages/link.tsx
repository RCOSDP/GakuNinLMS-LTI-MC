import { useRouter } from "next/router";
import type { BookSchema } from "$server/models/book";
import { useSessionAtom } from "$store/session";
import { updateLtiResourceLink } from "$utils/ltiResourceLink";
import { useBooks } from "$utils/books";
import BookLink from "$templates/BookLink";
import Placeholder from "$templates/Placeholder";
import { connectOrCreateBook } from "$utils/book";
import { pagesPath } from "$utils/$path";

function Index() {
  const router = useRouter();
  const { session, isBookEditable, isTopicEditable } = useSessionAtom();
  const booksWithInfiniteProps = useBooks(isBookEditable, isTopicEditable);
  const ltiLaunchBody = session?.ltiLaunchBody;
  const ltiResourceLink = ltiLaunchBody && {
    consumerId: ltiLaunchBody.oauth_consumer_key,
    id: ltiLaunchBody.resource_link_id,
    title: ltiLaunchBody.resource_link_title ?? "",
    contextId: ltiLaunchBody.context_id,
    contextTitle: ltiLaunchBody.context_title ?? "",
    contextLabel: ltiLaunchBody.context_label ?? "",
  };
  async function handleSubmit(book: BookSchema) {
    if (ltiResourceLink == null) return;
    const { id: bookId } = await connectOrCreateBook(
      book,
      isBookEditable,
      isTopicEditable
    );
    await updateLtiResourceLink({ ...ltiResourceLink, bookId });
    return router.push(pagesPath.book.$url({ query: { bookId } }));
  }
  function handleCancel() {
    const ltiResourceLink = session?.ltiResourceLink;
    if (!ltiResourceLink) return router.push(pagesPath.books.$url());
    return router.push(
      pagesPath.book.$url({ query: { bookId: ltiResourceLink.bookId } })
    );
  }
  function handleBookEdit({ id }: Pick<BookSchema, "id">) {
    return router.push(
      pagesPath.book.edit.$url({
        query: { bookId: id, context: "link" },
      })
    );
  }
  function handleBookNew() {
    return router.push(pagesPath.book.new.$url({ query: { context: "link" } }));
  }
  const handlers = {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    onBookEditClick: handleBookEdit,
    onBookNewClick: handleBookNew,
    isBookEditable,
  };

  if (ltiResourceLink == null) return <Placeholder />;

  return (
    <BookLink
      ltiResourceLink={ltiResourceLink}
      {...booksWithInfiniteProps}
      {...handlers}
    />
  );
}

export default Index;
