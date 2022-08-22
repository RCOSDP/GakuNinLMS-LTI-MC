import { useMemo } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import groupBy from "just-group-by";
import ContentTypeIndicator from "$atoms/ContentTypeIndicator";
import Container from "$atoms/Container";
import SortSelect from "$atoms/SortSelect";
import CourseSearchTextField from "$molecules/CourseSearchTextField";
import ActionHeader from "$organisms/ActionHeader";
import Accordion from "$organisms/Accordion";
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
  onBookPreviewClick(book: Pick<BookSchema, "id">): void;
  onBookEditClick(book: Pick<BookSchema, "id" | "authors">): void;
};

export default function Courses({
  clientIds,
  contents,
  loading = false,
  onBookPreviewClick,
  onBookEditClick,
}: Props) {
  const linkSearchProps = useLinkSearchAtom();
  const clients = useMemo(
    () => Object.entries(groupBy(contents, (link) => link.oauthClientId)),
    [contents]
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
        {clients.map(([oauthClientId, links]) => {
          const courses = Object.entries(
            groupBy(links, (link) =>
              [oauthClientId, link.ltiContext.id]
                .map(encodeURIComponent)
                .join(":")
            )
          );
          return (
            <Accordion
              key={oauthClientId}
              summary={oauthClientId ? <code>{oauthClientId}</code> : "その他"}
              details={courses.map(([id, links]) => {
                const [course] = links;
                return (
                  <TreeView
                    key={id}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                  >
                    <CourseTree
                      oauthClientId={course.oauthClientId}
                      ltiContext={course.ltiContext}
                      links={links}
                      onBookPreviewClick={onBookPreviewClick}
                      onBookEditClick={onBookEditClick}
                      isContentEditable={isContentEditable}
                    />
                  </TreeView>
                );
              })}
            />
          );
        })}
        {contents.length === 0 &&
          (loading
            ? [...Array(3)].map((_, i) => <Skeleton key={i} height={64} />)
            : "提供中のブックは存在しません")}
      </Box>
    </Container>
  );
}
