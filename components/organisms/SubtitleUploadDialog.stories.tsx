export default { title: "organisms/SubtitleUploadDialog" };

import { useState } from "react";
import Button from "@mui/material/Button";
import SubtitleUploadDialog from "./SubtitleUploadDialog";

export const Default = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = console.log;
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClick}>
        ダイアログ
      </Button>
      <SubtitleUploadDialog
        open={open}
        onClose={handleClose}
        onSubmit={onSubmit}
      />
    </>
  );
};
