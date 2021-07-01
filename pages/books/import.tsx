import { useState } from "react";
import { useRouter } from "next/router";
import {
  BooksImportParams,
  BooksImportResult,
} from "$server/validators/booksImportParams";
import BooksImport from "$templates/BooksImport";
import { importBooks } from "$utils/books";
import { pagesPath } from "$utils/$path";

export type Query = { context?: "books" };

function Import({ context }: Query) {
  const router = useRouter();
  const importProps: BooksImportParams = { json: "" };
  const [importResult, setImportResult] = useState<BooksImportResult>({});
  const back = () => {
    switch (context) {
      case "books":
        return router.push(pagesPath[context].$url());
      default:
        return router.push(pagesPath.books.$url());
    }
  };
  async function handleSubmit(props: BooksImportParams) {
    try {
      setImportResult(await importBooks(props));
    } catch (e) {
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

  return (
    <BooksImport
      importBooks={importProps}
      importResult={importResult}
      {...handlers}
    />
  );
}

function Router() {
  const router = useRouter();
  const { context }: Pick<Query, "context"> = router.query;
  return <Import context={context} />;
}

export default Router;
