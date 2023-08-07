import { useState } from "react";
import { useRouter } from "next/router";
import type { ContentSchema } from "$server/models/content";
import type {
  BooksImportParams,
  BooksImportResult,
} from "$server/models/booksImportParams";
import ContentImport from "$templates/ContentImport";
import Book from "$templates/Book";
import BookPreviewDialog from "$organisms/BookPreviewDialog";
import importBooks from "$utils/importBooks";
import { pagesPath } from "$utils/$path";
import useDialogProps from "$utils/useDialogProps";

export type Query = { context?: "books" };

function Import({ context }: Query) {
  const router = useRouter();
  const [importResult, setImportResult] = useState<BooksImportResult>({});
  const {
    data: previewContent,
    open,
    onClose,
    dispatch: onContentPreviewClick,
  } = useDialogProps<ContentSchema>();
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
    onContentPreviewClick,
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  };

  return (
    <>
      <ContentImport importResult={importResult} {...handlers} />
      {previewContent?.type === "book" && (
        <BookPreviewDialog open={open} onClose={onClose} book={previewContent}>
          {(props) => <Book {...props} />}
        </BookPreviewDialog>
      )}
    </>
  );
}

function Router() {
  const router = useRouter();
  const { context }: Pick<Query, "context"> = router.query;
  return <Import context={context} />;
}

export default Router;
