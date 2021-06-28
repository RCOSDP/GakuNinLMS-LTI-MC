import useInfiniteScroll from "react-infinite-scroll-hook";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import ActionHeader from "$organisms/ActionHeader";
import BookPreview from "$organisms/BookPreview";
import SortSelect from "$atoms/SortSelect";
import CreatorFilter from "$atoms/CreatorFilter";
import SearchTextField from "$atoms/SearchTextField";
import type { BookSchema } from "$server/models/book";
import type { LinkedBook } from "$types/linkedBook";
import { SortOrder } from "$server/models/sortOrder";
import { Filter } from "$types/filter";
import useContainerStyles from "styles/container";
import useCardStyles from "$styles/card";
import { useSearchAtom } from "$store/search";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  linkedBookPlaceholder: {
    // NOTE: BookPreviewに依存する&事前に高さを確定できないので決め打ち
    height: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
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
  linkedBook?: LinkedBook;
  loading?: boolean;
  hasNextPage?: boolean;
  onLoadMore?(): void;
  onBookPreviewClick?(book: BookSchema): void;
  onBookEditClick?(book: BookSchema): void;
  onBookLinkClick?(book: BookSchema): void;
  onLinkedBookClick?(book: BookSchema): void;
  onBookNewClick(): void;
  onSortChange?(sort: SortOrder): void;
  onFilterChange?(filter: Filter): void;
};

export default function Books(props: Props) {
  const {
    books,
    linkedBook,
    loading = false,
    hasNextPage = false,
    onLoadMore = () => undefined,
    onBookPreviewClick,
    onBookEditClick,
    onBookLinkClick,
    onLinkedBookClick,
    onBookNewClick,
    onSortChange,
    onFilterChange,
  } = props;
  const { query, onSearchInput, onLtiContextClick } = useSearchAtom();
  const handleBookNewClick = () => onBookNewClick();
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const cardClasses = useCardStyles();
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
          </>
        }
        body={
          <>
            <Typography className={classes.title} variant="h5">
              提供中のブック
            </Typography>
            {linkedBook && (
              <BookPreview
                book={{ ...linkedBook, ltiResourceLinks: [] }}
                linked
                onBookPreviewClick={onBookPreviewClick}
                onBookEditClick={
                  linkedBook.editable ? onBookEditClick : undefined
                }
                onLinkedBookClick={onLinkedBookClick}
                onLtiContextClick={onLtiContextClick}
              />
            )}
            {!linkedBook && (
              <Card
                classes={cardClasses}
                className={classes.linkedBookPlaceholder}
              >
                <Typography variant="body2">
                  提供中のブックがありません。
                  <br />
                  ブックを提供するには、提供したいブックの「このブックを提供」ボタンをクリックしてください。
                </Typography>
              </Card>
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
              linked={book.id === linkedBook?.id}
              onBookPreviewClick={onBookPreviewClick}
              onBookEditClick={onBookEditClick}
              onBookLinkClick={onBookLinkClick}
              onLinkedBookClick={onLinkedBookClick}
              onLtiContextClick={onLtiContextClick}
            />
          ))}
          {loading &&
            [...Array(5)].map((_, i) => <Skeleton key={i} height={64} />)}
        </div>
      </Container>
    </div>
  );
}
