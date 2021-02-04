import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import LinkIcon from "@material-ui/icons/Link";
import TopBar from "$organisms/TopBar";
import BookAccordion from "$organisms/BookAccordion";
import SortSelect from "$atoms/SortSelect";
import SearchTextField from "$atoms/SearchTextField";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import useContainerStyles from "styles/container";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
  },
  books: {
    marginTop: theme.spacing(1),
  },
}));

type Props = {
  books: BookSchema[];
  ltiResourceLink?: Pick<LtiResourceLinkSchema, "title"> | null;
  onBookClick(book: BookSchema): void;
  onBookEditClick(book: BookSchema): void;
  onBookNewClick(): void;
  onBookLinkClick(): void;
  onTopicEditClick?(topic: TopicSchema): void;
  isTopicEditable?(topic: TopicSchema): boolean | undefined;
};

export default function Books(props: Props) {
  const {
    books,
    ltiResourceLink,
    onBookClick,
    onBookEditClick,
    onBookNewClick,
    onBookLinkClick,
    onTopicEditClick,
    isTopicEditable,
  } = props;
  const handleBookEditClick = (book: BookSchema) => () => onBookEditClick(book);
  const handleTopicClick = (book: BookSchema) => () => onBookClick(book);
  const handleBookNewClick = () => onBookNewClick();
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  return (
    <>
      <TopBar
        maxWidth="md"
        title={
          <>
            マイブック
            <Button size="small" color="primary" onClick={handleBookNewClick}>
              <AddIcon className={classes.icon} />
              ブックの作成
            </Button>
            {ltiResourceLink && (
              <Button size="small" color="primary" onClick={onBookLinkClick}>
                <LinkIcon className={classes.icon} />
                LTIリンク「{ltiResourceLink.title}」と連携
              </Button>
            )}
          </>
        }
        action={
          <>
            <SortSelect disabled /* TODO: ソート機能を追加したら有効化して */ />
            <SearchTextField
              placeholder="ブック・トピック検索"
              disabled // TODO: ブック・トピック検索機能追加したら有効化して
            />
          </>
        }
      />
      <Container classes={containerClasses} maxWidth="md">
        <div className={classes.books}>
          {books.map((book) => (
            <BookAccordion
              key={book.id}
              book={book}
              onEditClick={handleBookEditClick(book)}
              onTopicClick={handleTopicClick(book)}
              onTopicEditClick={onTopicEditClick}
              isTopicEditable={isTopicEditable}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
