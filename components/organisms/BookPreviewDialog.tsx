import { useEffect, forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import type { TransitionProps } from "@material-ui/core/transitions";
import IconButton from "$atoms/IconButton";
import Book from "$templates/Book";
import { useBookAtom } from "$store/book";
import { useSessionAtom } from "$store/session";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import { gray } from "$theme/colors";

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useDialogStyles = makeStyles({
  paper: {
    backgroundColor: gray[50],
  },
});

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "fixed",
    top: theme.spacing(3),
    right: theme.spacing(3),
    zIndex: 3,
  },
}));

type Props = {
  book: BookSchema;
  open: boolean;
  onClose: React.MouseEventHandler;
  onBookEditClick(book: BookSchema): void;
  onBookLinkClick(book: BookSchema): void;
  onTopicEditClick(topic: TopicSchema): void;
};

export default function BookPreviewDialog(props: Props) {
  const {
    book,
    open,
    onClose,
    onBookEditClick,
    onBookLinkClick,
    onTopicEditClick,
  } = props;
  const dialogClasses = useDialogStyles();
  const classes = useStyles();
  const { updateBook, itemIndex, updateItemIndex } = useBookAtom();
  const { session } = useSessionAtom();
  useEffect(() => {
    updateBook(book);
  }, [book, updateBook]);
  return (
    <Dialog
      classes={dialogClasses}
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <IconButton
        className={classes.closeButton}
        tooltipProps={{ title: "閉じる" }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <Book
        book={book}
        index={itemIndex}
        linked={book.id === session?.ltiResourceLink?.bookId}
        onTopicEnded={updateItemIndex}
        onItemClick={updateItemIndex}
        onBookEditClick={onBookEditClick}
        onBookLinkClick={onBookLinkClick}
        onTopicEditClick={onTopicEditClick}
      />
      ;
    </Dialog>
  );
}
