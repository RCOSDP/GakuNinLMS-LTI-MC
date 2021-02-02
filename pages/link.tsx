import { useRouter } from "next/router";
import type { BookSchema } from "$server/models/book";
import type { UserSchema } from "$server/models/user";
import bookCreateBy from "$utils/bookCreateBy";
import { useSession } from "$utils/session";
import { updateLtiResourceLink } from "$utils/ltiResourceLink";
import { useBooks } from "$utils/books";
import BookLink from "$templates/BookLink";
import Unknown from "$templates/Unknown";
import Placeholder from "$templates/Placeholder";
import { createBook } from "$utils/book";
import { pagesPath } from "$utils/$path";

const sharedOrCreatedBy = (author?: Pick<UserSchema, "id">) => (
  book: BookSchema
) => {
  return book.shared || bookCreateBy(book, author);
};

function Index() {
  const router = useRouter();
  const { data: session, error } = useSession();
  const books = useBooks();
  const ltiLaunchBody = session?.ltiLaunchBody;
  const ltiResourceLink = ltiLaunchBody && {
    id: ltiLaunchBody.resource_link_id,
    title: ltiLaunchBody.resource_link_title ?? "",
    contextId: ltiLaunchBody.context_id,
    contextTitle: ltiLaunchBody.context_title ?? "",
  };
  async function handleSubmit(book: BookSchema) {
    if (ltiResourceLink == null) return;
    const connectOrCreateBook = async (book: BookSchema) => {
      if (!session?.user) return Promise.reject();
      if (bookCreateBy(book, session.user)) return Promise.resolve(book.id);
      // NOTE: 自身以外の作成したブックに関しては影響を及ぼすのを避ける目的で複製
      const { ltiResourceLinks: _, ...bookProps } = book;
      return createBook(bookProps).then(({ id }) => id);
    };
    const bookId = await connectOrCreateBook(book);
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
  if (error) {
    return <Unknown header="セッション情報が得られませんでした" />;
  }

  return (
    <BookLink
      books={books.filter(sharedOrCreatedBy(session?.user))}
      ltiResourceLink={ltiResourceLink}
      {...handlers}
    />
  );
}

export default Index;
