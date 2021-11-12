export default { title: "organisms/BookPreviewDialog" };

import Button from "@mui/material/Button";
import type { BookSchema } from "$server/models/book";
import useDialogProps from "$utils/useDialogProps";
import BookPreviewDialog from "./BookPreviewDialog";
import Book from "$templates/Book";
import { book } from "$samples";

const handlers = {
  onBookEditClick: console.log,
  onBookLinkClick: console.log,
  onOtherBookLinkClick: console.log,
  onTopicEditClick: console.log,
};

export const Default = () => {
  const { data, dispatch, ...dialogProps } = useDialogProps<BookSchema>();
  const handleClick = () => dispatch(book);
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClick}>
        ダイアログ
      </Button>
      {data && (
        <BookPreviewDialog book={data} {...dialogProps} {...handlers}>
          {(props) => <Book {...props} {...handlers} />}
        </BookPreviewDialog>
      )}
    </>
  );
};
