import { useMemo, useState, useCallback } from "react";
import { useConfirm } from "material-ui-confirm";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import groupBy from "just-group-by";
import ContentTypeIndicator from "$atoms/ContentTypeIndicator";
import Container from "$atoms/Container";
import SortSelect from "$atoms/SortSelect";
import CourseSearchTextField from "$molecules/CourseSearchTextField";
import ActionHeader from "$organisms/ActionHeader";
import ActionFooter from "$organisms/ActionFooter";
import CourseTree from "$organisms/CourseTree";
import CourseFilterColumn from "$organisms/CourseFilterColumn";
import { useLinkSearchAtom } from "$store/linkSearch";
import { useSessionAtom } from "$store/session";
import type { LinkSchema } from "$server/models/link/content";
import type { BookSchema } from "$server/models/book";

type Props = {
  clientIds: string[];
  contents: LinkSchema[];
  loading?: boolean;
  onLinksDeleteClick(
    links: Array<Pick<LinkSchema, "oauthClientId" | "ltiResourceLink">>
  ): void;
  onBookPreviewClick(book: Pick<BookSchema, "id">): void;
  onBookEditClick(book: Pick<BookSchema, "id" | "authors">): void;
};

export default function Courses({
  clientIds,
  contents,
  loading = false,
  onLinksDeleteClick,
  onBookPreviewClick,
  onBookEditClick,
}: Props) {
  const linkSearchProps = useLinkSearchAtom();
  const clients = useMemo(
    () => Object.entries(groupBy(contents, (link) => link.oauthClientId)),
    [contents]
  );
  const [selected, select] = useState<Set<string>>(new Set());
  const confirm = useConfirm();
  const handleLinksDeleteClick = useCallback(async () => {
    if (selected.size === 0) return;
    await confirm({
      title: `${selected.size}件の提供を解除します。よろしいですか？`,
      cancellationText: "キャンセル",
      confirmationText: "OK",
    });
    onLinksDeleteClick([...selected].map((json) => JSON.parse(json)));
    select(new Set());
  }, [selected, select, onLinksDeleteClick, confirm]);
  const onTreeChange = useCallback(
    (link: LinkSchema, checked: boolean) => {
      select((selected) => {
        const json = JSON.stringify(link);
        if (checked) selected.add(json);
        else selected.delete(json);
        return new Set(selected);
      });
    },
    [select]
  );
  const { isContentEditable } = useSessionAtom();
  return (
    <Container twoColumns maxWidth="xl">
      <ActionHeader sx={{ gridArea: "action-header" }}>
        <ContentTypeIndicator type="course" />
        <SortSelect<"created" | "reverse-created">
          onSortChange={linkSearchProps.onSortChange}
          options={[
            {
              value: "created",
              label: "作成日順（新しい）",
            },
            {
              value: "reverse-created",
              label: "作成日順（古い）",
            },
          ]}
        />
        <CourseSearchTextField
          label="コース名検索"
          onSearchSubmit={linkSearchProps.onSearchSubmit}
        />
      </ActionHeader>
      <CourseFilterColumn sx={{ gridArea: "side" }} clientIds={clientIds} />
      <Box gridArea="items">
        {clients.map(([id, links]) => {
          const [course] = links;
          return (
            <CourseTree
              key={id}
              oauthClientId={course.oauthClientId}
              ltiContext={course.ltiContext}
              links={links}
              selected={selected}
              select={select}
              onTreeChange={onTreeChange}
              onBookPreviewClick={onBookPreviewClick}
              onBookEditClick={onBookEditClick}
              isContentEditable={isContentEditable}
            />
          );
        })}
        {contents.length === 0 &&
          (loading
            ? [...Array(3)].map((_, i) => <Skeleton key={i} height={64} />)
            : "提供中のブックは存在しません")}
        {selected.size > 0 && (
          <ActionFooter maxWidth="lg">
            <Button
              color="error"
              size="large"
              variant="contained"
              onClick={handleLinksDeleteClick}
            >
              {selected.size}件の提供解除
            </Button>
          </ActionFooter>
        )}
      </Box>
    </Container>
  );
}
