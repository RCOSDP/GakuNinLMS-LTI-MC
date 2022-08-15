import { useMemo } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import groupBy from "just-group-by";
import ContentTypeIndicator from "$atoms/ContentTypeIndicator";
import Container from "$atoms/Container";
import ActionHeader from "$organisms/ActionHeader";
import Accordion from "$organisms/Accordion";
import CourseTree from "$organisms/CourseTree";
import { useSessionAtom } from "$store/session";
import type { LinkSchema } from "$server/models/link/content";
import type { BookSchema } from "$server/models/book";

type Props = {
  contents: LinkSchema[];
  loading?: boolean;
  onBookPreviewClick(book: Pick<BookSchema, "id">): void;
  onBookEditClick(book: Pick<BookSchema, "id" | "authors">): void;
};

export default function Courses({
  contents,
  loading = false,
  onBookPreviewClick,
  onBookEditClick,
}: Props) {
  const clients = useMemo(
    () => Object.entries(groupBy(contents, (link) => link.oauthClientId)),
    [contents]
  );
  const { isContentEditable } = useSessionAtom();
  return (
    <Container twoColumns maxWidth="xl">
      <ActionHeader sx={{ gridArea: "action-header" }}>
        <ContentTypeIndicator type="course" />
        {/* TODO: https://github.com/npocccties/chibichilo/issues/773
        <SearchTextField
          label="コース名検索"
          value={searchProps.input}
          onSearchInput={searchProps.onSearchInput}
          onSearchInputReset={searchProps.onSearchInputReset}
          onSearchSubmit={searchProps.onSearchSubmit}
          onSearchTargetChange={searchProps.onSearchTargetChange}
        /> */}
      </ActionHeader>
      {/* TODO: https://github.com/npocccties/chibichilo/issues/773
      <FilterColumn sx={{ gridArea: "side" }} variant="topic" /> */}
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
