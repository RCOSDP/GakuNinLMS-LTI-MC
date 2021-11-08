import useInfiniteScroll from "react-infinite-scroll-hook";
import Skeleton from "@mui/material/Skeleton";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ActionHeader from "$organisms/ActionHeader";
import BookPreview from "$organisms/BookPreview";
import ContentPreview from "$organisms/ContentPreview";
import SortSelect from "$atoms/SortSelect";
import AuthorFilter from "$atoms/AuthorFilter";
import SearchTextField from "$atoms/SearchTextField";
import type { BookSchema } from "$server/models/book";
import type { LinkedBook } from "$types/linkedBook";
import type { SortOrder } from "$server/models/sortOrder";
import type { Filter } from "$types/filter";
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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 296px)",
    gap: theme.spacing(2),
  },
}));

export type Props = {
  books: BookSchema[];
  linkedBook?: LinkedBook;
  loading?: boolean;
  hasNextPage?: boolean;
  onLoadMore?(): void;
  onBookPreviewClick(book: BookSchema): void;
  onBookEditClick(book: BookSchema): void;
  onBookLinkClick(book: BookSchema): void;
  onLinkedBookClick?(book: BookSchema): void;
  onBookNewClick(): void;
  onBooksImportClick(): void;
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
    onBooksImportClick,
    onSortChange,
    onFilterChange,
  } = props;
  const { query, onSearchInput, onLtiContextClick, onSearchInputReset } =
    useSearchAtom();
  const handleBookNewClick = () => onBookNewClick();
  const handleBooksImportClick = () => onBooksImportClick();
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const cardClasses = useCardStyles();
  const [infiniteRef] = useInfiniteScroll({ loading, hasNextPage, onLoadMore });
  return (
    <div ref={infiniteRef}>
      <ActionHeader
        maxWidth="lg"
        title={
          <>
            ブック
            <Button size="small" color="primary" onClick={handleBookNewClick}>
              <AddIcon className={classes.icon} />
              ブックの作成
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={handleBooksImportClick}
            >
              <AddIcon className={classes.icon} />
              一括登録
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
            <AuthorFilter onFilterChange={onFilterChange} />
            <SearchTextField
              label="ブック・トピック検索"
              value={query.input}
              onSearchInput={onSearchInput}
              onSearchInputReset={onSearchInputReset}
            />
          </>
        }
      />
      <Container classes={containerClasses} maxWidth="lg">
        <div className={classes.books}>
          {books.map((book) => (
            <ContentPreview
              key={book.id}
              content={book}
              linked={book.id === linkedBook?.id}
              onContentPreviewClick={onBookPreviewClick}
              onContentEditClick={onBookEditClick}
              onContentLinkClick={onBookLinkClick}
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
