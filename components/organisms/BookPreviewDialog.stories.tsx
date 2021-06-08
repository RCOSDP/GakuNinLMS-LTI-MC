export default { title: "organisms/BookPreviewDialog" };

import Button from "@material-ui/core/Button";
import type { BookSchema } from "$server/models/book";
import useDialogProps from "$utils/useDialogProps";
import BookPreviewDialog from "./BookPreviewDialog";
import { book } from "$samples";

const handlers = {
  onBookEditClick: console.log,
  onBookLinkClick: console.log,
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
      {data && <BookPreviewDialog book={data} {...dialogProps} {...handlers} />}
    </>
  );
};
