import { useRouter } from "next/router";
import type { BookSchema } from "$server/models/book";
import { useSession } from "$utils/session";
import { updateLtiResourceLink } from "$utils/ltiResourceLink";
import { useBooks } from "$utils/books";
import BookLink from "$templates/BookLink";
import Placeholder from "$templates/Placeholder";
import Problem from "$organisms/Problem";
import { connectOrCreateBook } from "$utils/book";
import { pagesPath } from "$utils/$path";

function Index() {
  const router = useRouter();
  const { data: session, error } = useSession();
  const books = useBooks(session?.user);
  const ltiLaunchBody = session?.ltiLaunchBody;
  const ltiResourceLink = ltiLaunchBody && {
    consumerId: ltiLaunchBody.oauth_consumer_key,
    id: ltiLaunchBody.resource_link_id,
    title: ltiLaunchBody.resource_link_title ?? "",
    contextId: ltiLaunchBody.context_id,
    contextTitle: ltiLaunchBody.context_title ?? "",
  };
  async function handleSubmit(book: BookSchema) {
    if (ltiResourceLink == null) return;
    if (!session?.user) return;
    // NOTE: 自身以外の作成したブックに関しては影響を及ぼすのを避ける目的で複製
    const { id: bookId } = await connectOrCreateBook(session.user, book);
    await updateLtiResourceLink({ ...ltiResourceLink, bookId });
    return router.push(pagesPath.book.$url({ query: { bookId } }));
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
    onBookEditClick: handleBookEdit,
    onBookNewClick: handleBookNew,
    isBookEditable: (book: BookSchema) =>
      // NOTE: 自身以外の作成したブックに関しては編集不可
      session?.user && book.author.id === session.user.id,
  };

  if (ltiResourceLink == null) return <Placeholder />;
  if (!books) return <Placeholder />;
  if (error) return <Problem title="セッション情報が得られませんでした" />;

  return (
    <BookLink books={books} ltiResourceLink={ltiResourceLink} {...handlers} />
  );
}

export default Index;
