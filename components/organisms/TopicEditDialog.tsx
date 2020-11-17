import { forwardRef, ReactElement, Ref, ComponentProps } from "react";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { TransitionProps } from "@material-ui/core/transitions";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import TopicForm from "organisms/TopicForm";
import RequiredDot from "atoms/RequiredDot";
import useDialogContentStyles from "styles/dialogContent";
import useContainerStyles from "styles/container";

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "flex-end",
  },
  title: {
    marginBottom: theme.spacing(4),
    "& span": {
      verticalAlign: "middle",
    },
    "& .RequiredDot": {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.75),
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function TopicEditDialog(props: ComponentProps<typeof Dialog>) {
  const classes = useStyles();
  const dialogContentClasses = useDialogContentStyles();
  const containerClasses = useContainerStyles();
  const { open, onClose } = props;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <DialogContent classes={dialogContentClasses}>
        <Container classes={containerClasses} maxWidth="md">
          <header className={classes.header}>
            <IconButton color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </header>
          <Typography className={classes.title} variant="h4">
            トピックの作成
            <Typography variant="caption" component="span" aria-hidden="true">
              <RequiredDot />
              は必須項目です
            </Typography>
          </Typography>
          <TopicForm />
        </Container>
      </DialogContent>
    </Dialog>
  );
}
