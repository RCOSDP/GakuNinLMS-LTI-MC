export default { title: "organisms/BookEditDialog" };

import { useState } from "react";
import Button from "@material-ui/core/Button";
import BookEditDialog from "./BookEditDialog";

export const Default = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        ダイアログ
      </Button>
      <BookEditDialog open={open} onClose={handleClose} />
    </div>
  );
};
