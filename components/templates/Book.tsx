import { useState } from "react";
import clsx from "clsx";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LinkIcon from "@material-ui/icons/Link";
import BookChildren from "$organisms/BookChildren";
import BookItemDialog from "$organisms/BookItemDialog";
import TopicViewer from "$organisms/TopicViewer";
import ActionHeader from "$organisms/ActionHeader";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import { useSessionAtom } from "$store/session";
import useStickyProps from "$utils/useStickyProps";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "baseline",
    width: "100%",
    "& > *": {
      marginRight: theme.spacing(1),
    },
    "&$mobile": {
      fontSize: "1.75rem",
      alignItems: "center",
    },
    "& > $title ~ *": {
      flexShrink: 0,
    },
  },
  title: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  inner: {
    display: "grid",
    gap: `${theme.spacing(2)}px`,
    "&$desktop": {
      gridTemplateAreas: `
        "side main"
      `,
      gridTemplateColumns: "30% 1fr",
      gridAutoRows: "min-content",
    },
    "&$mobile": {
      gridTemplateAreas: `
        "main"
        "side"
      `,
    },
  },
  main: {
    gridArea: "main",
    "&$desktop": {
      marginBottom: theme.spacing(2),
    },
  },
  side: {
    gridArea: "side",
    "&$desktop": {
      marginTop: theme.spacing(2),
    },
  },
  scroll: {
    "&$desktop": {
      overflowY: "auto",
      height: "calc(100vh - 96px)",
    },
    "&$desktop$appbar": {
      height: "calc(100vh - 130px - 64px)",
    },
  },
  desktop: {},
  mobile: {},
  appbar: {},
}));

type Props = {
  linked?: boolean;
  book: BookSchema | null;
  index: ItemIndex;
  onBookEditClick(book: BookSchema): void;
  onBookLinkClick(): void;
  onTopicEditClick?(topic: TopicSchema): void;
  onTopicEnded(): void;
  onItemClick(index: ItemIndex): void;
};

export default function Book(props: Props) {
  const {
    linked,
    book,
    index: [sectionIndex, topicIndex],
    onBookEditClick,
    onBookLinkClick,
    onTopicEditClick,
    onTopicEnded,
    onItemClick,
  } = props;
  const topic = book?.sections[sectionIndex]?.topics[topicIndex];
  const { isInstructor, isBookEditable, isTopicEditable } = useSessionAtom();
  const classes = useStyles();
  const { classes: stickyClasses, scroll, desktop, mobile } = useStickyProps({
    backgroundColor: "transparent",
    top: 80,
    zIndex: 1,
  });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const handleInfoClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClick = () => book && onBookEditClick(book);
  const handleItemClick = (_: never, index: ItemIndex) => {
    onItemClick(index);
  };
  const handleItemEditClick = isInstructor
    ? (_: never, [sectionIndex, topicIndex]: ItemIndex) => {
        const topic = book?.sections[sectionIndex]?.topics[topicIndex];
        if (topic) onTopicEditClick?.(topic);
      }
    : undefined;

  return (
    <Container maxWidth="lg">
      <ActionHeader
        action={
          <Typography
            className={clsx(classes.header, { [classes.mobile]: !matches })}
            variant="h4"
            gutterBottom={true}
          >
            <span className={classes.title}>{book?.name}</span>
            <IconButton onClick={handleInfoClick}>
              <InfoOutlinedIcon />
            </IconButton>
            {((book && isBookEditable(book)) || book?.shared) && (
              <>
                <IconButton color="primary" onClick={handleEditClick}>
                  <EditOutlinedIcon />
                </IconButton>
              </>
            )}
            {isInstructor && linked && (
              <Button size="small" color="primary" onClick={onBookLinkClick}>
                <LinkIcon className={classes.icon} />
                他のブックを提供
              </Button>
            )}
          </Typography>
        }
      />
      <div
        className={clsx(
          classes.inner,
          matches ? classes.desktop : classes.mobile
        )}
      >
        <div className={clsx(classes.main, { [classes.desktop]: matches })}>
          {topic && (
            <TopicViewer topic={topic} onEnded={onTopicEnded} top={80} />
          )}
        </div>
        <div className={clsx(classes.side, { [classes.desktop]: matches })}>
          <BookChildren
            className={clsx(
              { [classes.desktop]: matches },
              classes.scroll,
              { [classes.appbar]: desktop },
              stickyClasses.sticky,
              { [stickyClasses.scroll]: scroll },
              { [stickyClasses.desktop]: desktop },
              { [stickyClasses.mobile]: mobile }
            )}
            index={[sectionIndex, topicIndex]}
            sections={book?.sections ?? []}
            onItemClick={handleItemClick}
            onItemEditClick={handleItemEditClick}
            isTopicEditable={isTopicEditable}
          />
        </div>
      </div>
      {book && <BookItemDialog open={open} onClose={handleClose} book={book} />}
    </Container>
  );
}
