import type { ChangeEvent } from "react";
import { useState } from "react";
import { useConfirm } from "material-ui-confirm";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ActionHeader from "$organisms/ActionHeader";
import ActionFooter from "$organisms/ActionFooter";
import ContentTypeIndicator from "$atoms/ContentTypeIndicator";
import ContentPreview from "$organisms/ContentPreview";
import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import SearchPagination from "$organisms/SearchPagination";
import Container from "$atoms/Container";
import SortSelect from "$atoms/SortSelect";
import AuthorFilter from "$atoms/AuthorFilter";
import SearchTextField from "$atoms/SearchTextField";
import type { ContentSchema } from "$server/models/content";
import type { TopicSchema } from "$server/models/topic";
import { grey } from "@mui/material/colors";
import useDialogProps from "$utils/useDialogProps";
import { useSearchAtom } from "$store/search";

type Props = {
  totalCount: number;
  contents: ContentSchema[];
  loading?: boolean;
  onBookNewClick(topics: TopicSchema[]): void;
  onTopicsShareClick(topics: TopicSchema[], shared: boolean): void;
  onTopicsDeleteClick(topics: TopicSchema[]): void;
  onContentEditClick(content: ContentSchema): void;
  onTopicNewClick(): void;
};

export default function Topics(props: Props) {
  const {
    totalCount,
    contents,
    loading = false,
    onBookNewClick,
    onTopicsShareClick,
    onTopicsDeleteClick,
    onContentEditClick,
    onTopicNewClick,
  } = props;
  const searchProps = useSearchAtom();
  const confirm = useConfirm();
  const [selected, select] = useState<Map<ContentSchema["id"], ContentSchema>>(
    new Map()
  );
  const getSelectedTopics = () =>
    [...selected.values()].filter(
      (content) => content.type === "topic"
    ) as TopicSchema[];
  const handleChecked = (content: ContentSchema) => () =>
    select(
      (selected) =>
        new Map(
          selected.delete(content.id)
            ? selected
            : selected.set(content.id, content)
        )
    );
  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    select(
      () =>
        new Map(
          event.target.checked
            ? contents.map((content) => [content.id, content] as const)
            : []
        )
    );
  };
  const handleBookNewClick = () => {
    onBookNewClick(getSelectedTopics());
  };
  const handleTopicsShareClick = () => {
    onTopicsShareClick(getSelectedTopics(), true);
  };
  const handleTopicsUnshareClick = () => {
    onTopicsShareClick(getSelectedTopics(), false);
  };
  const handleTopicsDeleteClick = async () => {
    const topics = getSelectedTopics();
    if (topics.length === 0) return;
    await confirm({
      title: `${topics.length}件のトピックを削除します。よろしいですか？`,
      cancellationText: "キャンセル",
      confirmationText: "OK",
    });
    onTopicsDeleteClick(topics);
    select(() => new Map([]));
  };

  const {
    data: previewContent,
    dispatch: handlePreviewClick,
    ...dialogProps
  } = useDialogProps<ContentSchema>();
  return (
    <Container twoColumns maxWidth="xl">
      <Typography sx={{ mt: 5, gridArea: "title" }} variant="h4">
        トピック
        <Button size="small" color="primary" onClick={onTopicNewClick}>
          <AddIcon sx={{ mr: 0.5 }} />
          トピックの作成
        </Button>
      </Typography>
      <ActionHeader sx={{ gridArea: "action-header" }}>
        <ContentTypeIndicator type="topic" />
        <Badge
          sx={{
            display: "inline-flex",
            padding: 0,
            backgroundColor: "white",
            border: "1px solid",
            borderColor: grey[300],
            borderRadius: 2,
          }}
          badgeContent={selected.size}
          color="primary"
        >
          <Checkbox
            size="small"
            color="primary"
            checked={selected.size === contents.length && selected.size > 0}
            indeterminate={
              selected.size !== contents.length && selected.size > 0
            }
            onChange={handleCheckAll}
          />
        </Badge>
        <SortSelect onSortChange={searchProps.onSortChange} />
        <SearchTextField
          label="トピック検索"
          value={searchProps.input}
          onSearchInput={searchProps.onSearchInput}
          onSearchInputReset={searchProps.onSearchInputReset}
          onSearchSubmit={searchProps.onSearchSubmit}
        />
      </ActionHeader>
      <Box gridArea="side">
        <Typography sx={{ pt: 4, mb: 4 }} variant="h5">
          絞り込み
        </Typography>
        <AuthorFilter onFilterChange={searchProps.onFilterChange} />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 296px)"
        gap={2}
        gridArea="items"
      >
        {contents.map((content) => (
          <ContentPreview
            key={content.id}
            content={content}
            checked={selected.has(content.id)}
            onChange={handleChecked(content)}
            onContentPreviewClick={handlePreviewClick}
            onContentEditClick={onContentEditClick}
            onKeywordClick={searchProps.onKeywordClick}
          />
        ))}
        {loading &&
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} height={324 /* TODO: 妥当な値にしてほしい */} />
          ))}
      </Box>
      <SearchPagination
        sx={{ mt: 4, gridArea: "search-pagination" }}
        totalCount={totalCount}
      />
      {selected.size > 0 && (
        <ActionFooter maxWidth="lg">
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={handleBookNewClick}
          >
            ブック作成
          </Button>
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={handleTopicsShareClick}
          >
            シェア
          </Button>
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={handleTopicsUnshareClick}
          >
            シェア解除
          </Button>
          <Button
            color="error"
            size="large"
            variant="contained"
            onClick={handleTopicsDeleteClick}
          >
            削除
          </Button>
        </ActionFooter>
      )}
      {previewContent?.type === "topic" && (
        <TopicPreviewDialog {...dialogProps} topic={previewContent} />
      )}
    </Container>
  );
}
