import { useState } from "react";
import { useRouter } from "next/router";
import type {
  BooksImportParams,
  BooksImportResult,
} from "$server/models/booksImportParams";
import ContentImport from "$templates/ContentImport";
import importTopic from "$utils/importTopic";

export type Query = { topicId?: number };

function Import({ topicId }: Query) {
  const router = useRouter();
  const [importResult, setImportResult] = useState<BooksImportResult>();
  const back = () => {
    return router.back();
  };
  const handleSubmit = async (props: BooksImportParams) => {
    try {
      setImportResult(undefined);
      if (topicId) {
        setImportResult(await importTopic(topicId, props));
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
      <ContentImport importResult={importResult} {...handlers} />
    </>
  );
}

function Router() {
  const router = useRouter();
  const { topicId }: Pick<Query, "topicId"> = router.query;
  return <Import topicId={topicId} />;
}

export default Router;
