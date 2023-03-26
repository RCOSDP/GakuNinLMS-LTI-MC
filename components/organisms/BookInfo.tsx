import Card from "@mui/material/Card";
import Markdown from "$atoms/Markdown";
import type { BookSchema } from "$server/models/book";
import KeywordChip from "$atoms/KeywordChip";
import makeStyles from "@mui/styles/makeStyles";
import useCardStyle from "$styles/card";

type Props = {
  className?: string;
  id?: string;
  book: BookSchema;
};

const useStyles = makeStyles((theme) => ({
  keywords: {
    display: "flex",
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing(0.75),
    "& > *": {
      marginRight: theme.spacing(0.5),
    },
  },
}));

export default function BookInfo({ className, id, book }: Props) {
  const classes = useStyles();
  const cardClasses = useCardStyle();

  return (
    <Card className={className} classes={cardClasses} id={id}>
      {book.keywords && (
        <ul className={classes.keywords}>
          {book.keywords.map((keyword) => {
            return (
              <li key={keyword.id}>
                <KeywordChip keyword={keyword} />
              </li>
            );
          })}
        </ul>
      )}
      {book.description && <Markdown>{book.description}</Markdown>}
    </Card>
  );
}
