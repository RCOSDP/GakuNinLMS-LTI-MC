import type { FormEvent } from "react";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ActionHeader from "$organisms/ActionHeader";
import ActionFooter from "$organisms/ActionFooter";
import ContentPreview from "$organisms/ContentPreview";
import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import SearchPagination from "$organisms/SearchPagination";
import SortSelect from "$atoms/SortSelect";
import AuthorFilter from "$atoms/AuthorFilter";
import SearchTextField from "$atoms/SearchTextField";
import type { ContentSchema } from "$server/models/content";
import type { TopicSchema } from "$server/models/topic";
import useContainerStyles from "$styles/container";
import useDialogProps from "$utils/useDialogProps";
import { useSearchAtom } from "$store/search";

const useStyles = makeStyles((theme) => ({
  topics: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 296px)",
    gap: theme.spacing(2),
  },
  form: {
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  pagination: {
    marginTop: theme.spacing(4),
  },
}));

type Props = {
  contents: ContentSchema[];
  loading?: boolean;
  hasNextPage: boolean;
  onLoadMore?(): void;
  onSubmit(topics: TopicSchema[]): void;
  onCancel(): void;
  onContentEditClick(content: ContentSchema): void;
};

export default function TopicImport(props: Props) {
  const {
    contents,
    loading = false,
    hasNextPage,
    onSubmit,
    onCancel,
    onContentEditClick,
  } = props;
  const searchProps = useSearchAtom();
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const [selectedIndexes, select] = useState<Set<number>>(new Set());
  const handleChecked = (index: number) => () =>
    select((indexes) =>
      indexes.delete(index) ? new Set(indexes) : new Set(indexes.add(index))
    );
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(
      [...selectedIndexes].flatMap((i) => {
        const content = contents[i];
        return content.type === "topic" ? [content] : [];
      })
    );
  };
  const {
    data: previewContent,
    dispatch: handlePreviewClick,
    ...dialogProps
  } = useDialogProps<ContentSchema>();
  return (
    <Container classes={containerClasses} maxWidth="lg">
      <ActionHeader
        title={
          <>
            トピックの再利用
            <Typography variant="body1">
              再利用するトピックを選んで下さい
            </Typography>
          </>
        }
        action={
          <>
            <SortSelect onSortChange={searchProps.onSortChange} />
            <AuthorFilter onFilterChange={searchProps.onFilterChange} />
            <SearchTextField
              label="トピック検索"
              value={searchProps.query.q}
              onSearchInput={searchProps.onSearchInput}
              onSearchInputReset={searchProps.onSearchInputReset}
            />
          </>
        }
      />
      <div className={classes.topics}>
        {contents.map((content, index) => (
          <ContentPreview
            key={index}
            content={content}
            checked={selectedIndexes.has(index)}
            onChange={handleChecked(index)}
            onContentPreviewClick={handlePreviewClick}
            onContentEditClick={onContentEditClick}
            onKeywordClick={searchProps.onKeywordClick}
          />
        ))}
        {loading &&
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} height={324 /* TODO: 妥当な値にしてほしい */} />
          ))}
      </div>
      <ActionFooter maxWidth="lg">
        <form className={classes.form} onSubmit={handleSubmit}>
          <Button
            color="primary"
            size="small"
            variant="text"
            onClick={onCancel}
          >
            キャンセル
          </Button>
          <Button
            color="primary"
            size="large"
            variant="contained"
            type="submit"
          >
            再利用
          </Button>
        </form>
      </ActionFooter>
      <SearchPagination
        className={classes.pagination}
        hasNextPage={hasNextPage}
      />
      {previewContent?.type === "topic" && (
        <TopicPreviewDialog {...dialogProps} topic={previewContent} />
      )}
    </Container>
  );
}
