export default { title: "organisms/TopicEditDialog" };

import { useState } from "react";
import Button from "@material-ui/core/Button";
import TopicEditDialog from "./TopicEditDialog";

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
      <TopicEditDialog open={open} onClose={handleClose} />
    </div>
  );
};
