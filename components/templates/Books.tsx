import useInfiniteScroll from "react-infinite-scroll-hook";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import Book from "$templates/Book";
import ActionHeader from "$organisms/ActionHeader";
import BookPreview from "$organisms/BookPreview";
import BookPreviewDialog from "$organisms/BookPreviewDialog";
import SortSelect from "$atoms/SortSelect";
import CreatorFilter from "$atoms/CreatorFilter";
import SearchTextField from "$atoms/SearchTextField";
import useDialogProps from "$utils/useDialogProps";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import { SortOrder } from "$server/models/sortOrder";
import { Filter } from "$types/filter";
import useContainerStyles from "styles/container";
import { useSearchAtom } from "$store/search";
import { useSessionAtom } from "$store/session";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
  },
  alert: {
    marginTop: theme.spacing(1),
  },
  books: {
    marginTop: theme.spacing(1),
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export type Props = {
  books: BookSchema[];
  loading?: boolean;
  hasNextPage?: boolean;
  onLoadMore?(): void;
  onBookClick?(book: BookSchema): void;
  onBookEditClick(book: BookSchema): void;
  onBookLinkClick(book: BookSchema): void;
  onBookNewClick(): void;
  onTopicEditClick(topic: TopicSchema): void;
  onSortChange?(sort: SortOrder): void;
  onFilterChange?(filter: Filter): void;
};

export default function Books(props: Props) {
  const {
    books,
    loading = false,
    hasNextPage = false,
    onLoadMore = () => undefined,
    onBookEditClick,
    onBookLinkClick,
    onBookNewClick,
    onTopicEditClick,
    onSortChange,
    onFilterChange,
  } = props;
  const { query, onSearchInput, onLtiContextClick } = useSearchAtom();
  const { session, isInstructor } = useSessionAtom();
  const {
    data: dialog,
    open,
    onClose,
    dispatch,
  } = useDialogProps<BookSchema>();
  const handleBookClick = (book: BookSchema) => () => dispatch(book);
  const handleBookEditClick = (book: BookSchema) => () => onBookEditClick(book);
  const handleBookNewClick = () => onBookNewClick();
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading,
    hasNextPage,
    onLoadMore,
  });
  return (
    <div ref={infiniteRef}>
      <ActionHeader
        maxWidth="md"
        title={
          <>
            ブック
            <Button size="small" color="primary" onClick={handleBookNewClick}>
              <AddIcon className={classes.icon} />
              ブックの作成
            </Button>
            {!session?.ltiResourceLink && isInstructor && (
              <Alert className={classes.alert} severity="info">
                ブックが提供されていません。提供したいブックの「もっと詳しく...」をクリックしたのち「このブックを提供」をクリックしてください
              </Alert>
            )}
          </>
        }
        action={
          <>
            <SortSelect onSortChange={onSortChange} />
            <CreatorFilter onFilterChange={onFilterChange} />
            <SearchTextField
              placeholder="ブック・トピック検索"
              value={query.input}
              onSearchInput={onSearchInput}
            />
          </>
        }
      />
      <Container classes={containerClasses} maxWidth="md">
        <div className={classes.books}>
          {books.map((book) => (
            <BookPreview
              key={book.id}
              book={book}
              onBookClick={handleBookClick(book)}
              onBookEditClick={handleBookEditClick(book)}
              onLtiContextClick={onLtiContextClick}
            />
          ))}
          {loading &&
            [...Array(5)].map((_, i) => <Skeleton key={i} height={64} />)}
        </div>
      </Container>
      {dialog && (
        <BookPreviewDialog open={open} onClose={onClose} book={dialog}>
          {(props) => (
            <Book
              {...props}
              onBookEditClick={onBookEditClick}
              onBookLinkClick={onBookLinkClick}
              onTopicEditClick={onTopicEditClick}
            />
          )}
        </BookPreviewDialog>
      )}
    </div>
  );
}
