import { useState } from "react";
import { useRouter } from "next/router";
import type {
  BooksImportParams,
  BooksImportResult,
} from "$server/validators/booksImportParams";
import type { BookSchema } from "$server/models/book";
import BooksImport from "$templates/BooksImport";
import Book from "$templates/Book";
import BookPreviewDialog from "$organisms/BookPreviewDialog";
import { importBooks } from "$utils/books";
import { pagesPath } from "$utils/$path";
import useAuthorsHandler from "$utils/useAuthorsHandler";
import useDialogProps from "$utils/useDialogProps";

export type Query = { context?: "books" };

function Import({ context }: Query) {
  const router = useRouter();
  const { handleAuthorSubmit } = useAuthorsHandler();
  const [importResult, setImportResult] = useState<BooksImportResult>({});
  const {
    data: dialog,
    open,
    onClose,
    dispatch,
  } = useDialogProps<BookSchema>();
  const back = () => {
    switch (context) {
      case "books":
        return router.push(pagesPath[context].$url());
      default:
        return router.push(pagesPath.books.$url());
    }
  };
  const handleBookPreviewClick = (book: BookSchema) => dispatch(book);
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
    onBookPreviewClick: handleBookPreviewClick,
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    onAuthorSubmit: handleAuthorSubmit,
  };

  return (
    <>
      <BooksImport importResult={importResult} {...handlers} />
      {dialog && (
        <BookPreviewDialog open={open} onClose={onClose} book={dialog}>
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
