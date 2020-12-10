import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LinkIcon from "@material-ui/icons/Link";
import AppBar from "$organisms/AppBar";
import BookChildren from "$organisms/BookChildren";
import TopicViewer from "$organisms/TopicViewer";
import { Book, Topic } from "types/book";
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
  book: Book;
};

export default function Books(props: Props) {
  const { book } = props;
  const [topic, setTopic] = useState<Topic>(book.sections[0].topics[0]);
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const handleItemClick = (
    _: never,
    [sectionIndex, topicIndex]: [number, number]
  ) => setTopic(book.sections[sectionIndex].topics[topicIndex]);
  return (
    <>
      <AppBar position="sticky" />
      <Container
        classes={containerClasses}
        className={classes.container}
        maxWidth="md"
      >
        <Typography className={classes.title} variant="h4" gutterBottom={true}>
          {book.name}
          <IconButton>
            <InfoOutlinedIcon />
          </IconButton>
          <IconButton color="primary">
            <EditOutlinedIcon />
          </IconButton>
          <Button size="small" color="primary">
            <LinkIcon className={classes.icon} />
            LTIリンクの再連携
          </Button>
        </Typography>
        <TopicViewer {...topic} />
        <BookChildren sections={book.sections} onItemClick={handleItemClick} />
      </Container>
    </>
  );
}
