import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import { Button, DialogActions } from "@mui/material";
import React from "react";
import type { BookmarkParams } from "$server/validators/bookmarkParams";
import type { BookmarkProps } from "$server/models/bookmark";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  text: {
    paddingRight: theme.spacing(4),
  },
}));

type Props = {
  bookmarkdata: {
    id: BookmarkParams["id"];
    topicId: BookmarkProps["topicId"];
  };
  onDeleteBookmark: (id: number, topicId: number) => Promise<void>;
  open: boolean;
  onClose: React.MouseEventHandler;
};

export default function BookmarkDialog(props: Props) {
  const { bookmarkdata, open, onClose, onDeleteBookmark } = props;
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        <Typography variant="h5" component="p" className={classes.text}>
          タグを削除しますか？
        </Typography>
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary" size="small">
          キャンセル
        </Button>
        <Button
          onClick={async () =>
            await onDeleteBookmark(bookmarkdata.id, bookmarkdata.topicId)
          }
          color="primary"
          size="small"
        >
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
}
