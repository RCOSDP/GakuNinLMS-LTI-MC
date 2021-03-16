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
import useContainerStyles from "styles/container";

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
  },
  title: {
    textOverflow: "ellipsis",
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
      "bookChildren topicViewer"
    `,
      gridTemplateColumns: "30% 1fr",
    },
    "&$mobile": {
      gridTemplateAreas: `
      "topicViewer"
      "bookChildren"

`,
    },
  },
  topicViewer: {
    gridArea: "topicViewer",
  },
  bookChildren: {
    gridArea: "bookChildren",
  },
  desktop: {},
  mobile: {},
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
  const { isInstructor, isTopicEditable } = useSessionAtom();
  const classes = useStyles();
  const containerClasses = useContainerStyles();
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
    <Container classes={containerClasses} maxWidth="lg">
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
            {isInstructor && (
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
        {topic && (
          <TopicViewer
            className={classes.topicViewer}
            topic={topic}
            onEnded={onTopicEnded}
          />
        )}
        <BookChildren
          className={classes.bookChildren}
          index={[sectionIndex, topicIndex]}
          sections={book?.sections ?? []}
          onItemClick={handleItemClick}
          onItemEditClick={handleItemEditClick}
          isTopicEditable={isTopicEditable}
        />
      </div>
      {book && <BookItemDialog open={open} onClose={handleClose} book={book} />}
    </Container>
  );
}
