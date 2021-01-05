export default { title: "organisms/TopicPreviewDialog" };

import { useState } from "react";
import Button from "@material-ui/core/Button";
import TopicPreviewDialog from "./TopicPreviewDialog";
import { topic } from "$samples";

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
      <TopicPreviewDialog topic={topic} open={open} onClose={handleClose} />
    </>
  );
};
