import { useState } from "react";
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
  const importProps: BooksImportParams = { json: "" };
  const [importResult, setImportResult] = useState({ books: [], errors: [] });
  const back = () => {
    switch (context) {
      case "books":
      case "link":
        return router.push(pagesPath[context].$url());
      default:
        return router.push(pagesPath.books.$url());
    }
  };
  async function handleSubmit(props: BooksImportParams) {
    try {
      setImportResult(await importBooks(props));
    } catch(e) {
      setImportResult(await e.json());
    }
  }
  function handleCancel() {
    return back();
  }
  const handlers = {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  };

  return <BooksImport importBooks={importProps} importResult={importResult} {...handlers} />;
}

function Router() {
  const router = useRouter();
  const { context }: Pick<Query, "context"> = router.query;
  return <Import context={context} />;
}

export default Router;
