import { useState } from "react";
import { useRouter } from "next/router";
import type { ContentSchema } from "$server/models/content";
import type { BookSchema } from "$server/models/book";
import type {
  BooksImportParams,
  BooksImportResult,
} from "$server/models/booksImportParams";
import BooksImport from "$templates/BooksImport";
import Book from "$templates/Book";
import BookPreviewDialog from "$organisms/BookPreviewDialog";
import importBooks from "$utils/importBooks";
import { pagesPath } from "$utils/$path";
import useAuthorsHandler from "$utils/useAuthorsHandler";
import useDialogProps from "$utils/useDialogProps";
import { useBookAtom } from "$store/book";

export type Query = { context?: "books" };

function Import({ context }: Query) {
  const router = useRouter();
  const { handleAuthorSubmit } = useAuthorsHandler();
  const [importResult, setImportResult] = useState<BooksImportResult>({});
  const {
    data: previewContent,
    open,
    onClose,
    dispatch,
  } = useDialogProps<ContentSchema>();
  const { updateBook } = useBookAtom();
  const onContentPreviewClick = (content: ContentSchema) => {
    const book = content as BookSchema;
    updateBook(book);
    dispatch(content);
  };
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
    onAuthorSubmit: handleAuthorSubmit,
  };

  return (
    <>
      <BooksImport importResult={importResult} {...handlers} />
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
