import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { BookSchema } from "$server/models/book";
import useContainerStyles from "styles/container";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
}));

type Props = {
  book: BookSchema | null;
  index: [number, number];
  onBookEditClick(book: BookSchema): void;
  onTopicEnded(): void;
  onItemClick(index: [number, number]): void;
};

export default function Book(props: Props) {
  const {
    book,
    index: [sectionIndex, topicIndex],
    onBookEditClick,
    onTopicEnded,
    onItemClick,
  } = props;
  const topic = book?.sections[sectionIndex]?.topics[topicIndex];
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const [open, setOpen] = useState(false);
  const handleInfoClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClick = () => book && onBookEditClick(book);
  const handleItemClick = (_: never, index: [number, number]) => {
    onItemClick(index);
  };
  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="md"
    >
      <Typography className={classes.title} variant="h4" gutterBottom={true}>
        {book?.name}
        <IconButton onClick={handleInfoClick}>
          <InfoOutlinedIcon />
        </IconButton>
        <IconButton color="primary" onClick={handleEditClick}>
          <EditOutlinedIcon />
        </IconButton>
        <Button size="small" color="primary">
          <LinkIcon className={classes.icon} />
          LTIリンクの再連携
        </Button>
      </Typography>
      {topic && <TopicViewer topic={topic} onEnded={onTopicEnded} />}
      <BookChildren
        sections={book?.sections ?? []}
        onItemClick={handleItemClick}
      />
      {book && <BookItemDialog open={open} onClose={handleClose} book={book} />}
    </Container>
  );
}
