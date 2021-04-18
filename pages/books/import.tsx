import { useRouter } from "next/router";
import { BooksImportParams, booksImportParamsSchema } from "$server/validators/booksImportParams";
import { useSessionAtom } from "$store/session";
import BooksImport from "$templates/BooksImport";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$organisms/TopicNotFoundProblem";
import { importBooks } from "$utils/books";
import { pagesPath } from "$utils/$path";

export type Query = { context?: "books" | "link" };

function Import({ context }: Query) {
  const query = { ...(context && { context }) };
  const router = useRouter();
  const importProps = { json: "" };
  const back = () => {
    switch (context) {
      case "books":
      case "link":
        return router.push(pagesPath[context].$url());
      default:
        return router.push(pagesPath.book.$url({ query }));
    }
  };
  async function handleSubmit(props: BooksImportParams) {
    const res = await importBooks(props);
    //return back();
    console.log(res);
  }
  function handleCancel() {
    return back();
  }
  const handlers = {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  };

  return <BooksImport importBooks={importProps} {...handlers} />;
}

function Router() {
  const router = useRouter();
  const { context }: Pick<Query, "context"> = router.query;
  return <Import context={context} />;
}

export default Router;
