import { useState } from "react";
import { useRouter } from "next/router";
import type {
  BooksImportParams,
  BooksImportResult,
} from "$server/models/booksImportParams";
import ContentImport from "$templates/ContentImport";
import importBooks from "$utils/importBooks";
import { pagesPath } from "$utils/$path";

export type Query = { context?: "books" };

function Import({ context }: Query) {
  const router = useRouter();
  const [importResult, setImportResult] = useState<BooksImportResult>({});
  const back = () => {
    switch (context) {
      case "books":
        return router.push(pagesPath[context].$url());
      default:
        return router.push(pagesPath.books.$url());
    }
  };
  const handleSubmit = async (props: BooksImportParams) => {
    try {
      setImportResult(await importBooks(props));
    } catch (e) {
      // @ts-expect-error TODO: Object is of type 'unknown'
      setImportResult(await e.json());
    }
  };
  const handleCancel = () => {
    return back();
  };
  const handlers = {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  };

  return (
    <>
      <ContentImport importResult={importResult} {...handlers} />
    </>
  );
}

function Router() {
  const router = useRouter();
  const { context }: Pick<Query, "context"> = router.query;
  return <Import context={context} />;
}

export default Router;
