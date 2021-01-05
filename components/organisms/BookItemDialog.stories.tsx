export default { title: "organisms/BookItemDialog" };

import { useState } from "react";
import Button from "@material-ui/core/Button";
import BookItemDialog from "./BookItemDialog";
import { book } from "$samples";

export const Default = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClick}>
        ダイアログ
      </Button>
      <BookItemDialog open={open} onClose={handleClose} book={book} />
    </>
  );
};
