import { useState } from "react";
import { useRouter } from "next/router";
import type {
  BooksImportParams,
  BooksImportResult,
} from "$server/models/booksImportParams";
import ContentImport from "$templates/ContentImport";
import importTopic from "$utils/importTopic";

export type Query = { bookId?: number };

function Import({ bookId }: Query) {
  const router = useRouter();
  const [importResult, setImportResult] = useState<BooksImportResult>();
  const back = () => {
    return router.back();
  };
  const handleSubmit = async (props: BooksImportParams) => {
    try {
      setImportResult(undefined);
      if (bookId) {
        // TODO call importBook
        setImportResult(await importTopic(bookId, props));
      }
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
      <ContentImport
        title={"ブックの上書きインポート"}
        importResult={importResult}
        {...handlers}
      />
    </>
  );
}

function Router() {
  const router = useRouter();
  const { bookId }: Pick<Query, "bookId"> = router.query;
  return <Import bookId={bookId} />;
}

export default Router;
