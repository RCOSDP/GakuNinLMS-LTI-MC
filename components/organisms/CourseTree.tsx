import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import TreeItem from "@mui/lab/TreeItem";
import Checkbox from "@mui/material/Checkbox";
import PreviewButton from "$atoms/PreviewButton";
import EditButton from "$atoms/EditButton";
import SharedIndicator from "$atoms/SharedIndicator";
import useTreeItemStyle from "$styles/treeItem";
import type { IsContentEditable } from "$server/models/content";
import type { LtiContextSchema } from "$server/models/ltiContext";
import type { LinkSchema } from "$server/models/link/content";
import type { BookSchema } from "$server/models/book";
import theme from "$theme";

type Props = {
  oauthClientId: string;
  ltiContext: LtiContextSchema;
  links: Array<LinkSchema>;
  onTreeChange?(
    link: Pick<LinkSchema, "oauthClientId" | "ltiContext" | "ltiResourceLink">,
    checked: boolean
  ): void;
  onBookPreviewClick?(book: Pick<BookSchema, "id">): void;
  onBookEditClick?(book: Pick<BookSchema, "id" | "authors">): void;
  isContentEditable?: IsContentEditable;
};

type LinksTreeProps = {
  links: Array<LinkSchema>;
  linksSet: Set<LinkSchema>;
  updateLinksSet: Dispatch<SetStateAction<Set<LinkSchema>>>;
  onTreeChange?(
    link: Pick<LinkSchema, "oauthClientId" | "ltiContext" | "ltiResourceLink">,
    checked: boolean
  ): void;
  onBookPreviewClick?(book: Pick<BookSchema, "id">): void;
  onBookEditClick?(book: Pick<BookSchema, "id" | "authors">): void;
  isContentEditable?: IsContentEditable;
};

function LinksTree({
  links,
  linksSet,
  updateLinksSet,
  onTreeChange,
  onBookPreviewClick,
  onBookEditClick,
  isContentEditable,
}: LinksTreeProps) {
  return (
    <>
      {links.map((link) => {
        const nodeId = [
          link.oauthClientId,
          link.ltiContext.id,
          link.ltiResourceLink.id,
        ]
          .map(encodeURIComponent)
          .join(":");

        return (
          <TreeItem
            key={nodeId}
            nodeId={nodeId}
            onClick={(event) => {
              event.stopPropagation();
              (
                event.currentTarget?.querySelector(
                  `input[type="checkbox"]`
                ) as HTMLInputElement | null
              )?.click();
            }}
            label={
              <>
                {onTreeChange && (
                  <Checkbox
                    checked={linksSet.has(link)}
                    color="primary"
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    onChange={(event, checked) => {
                      event.stopPropagation();
                      updateLinksSet((linksSet) => {
                        if (checked) linksSet.add(link);
                        else linksSet.delete(link);
                        return new Set(linksSet);
                      });
                      onTreeChange(link, checked);
                    }}
                  />
                )}
                {link.ltiResourceLink.title &&
                  `(${link.ltiResourceLink.title}) → `}
                {link.book.name}
                {link.book.shared && (
                  <SharedIndicator sx={{ margin: theme.spacing(-0.5, 0.5) }} />
                )}
                <PreviewButton
                  variant="book"
                  onClick={() => onBookPreviewClick?.(link.book)}
                />
                {isContentEditable?.(link.book) && (
                  <EditButton
                    variant="book"
                    onClick={() => onBookEditClick?.(link.book)}
                  />
                )}
              </>
            }
          />
        );
      })}
    </>
  );
}

export default function CourseTree(props: Props) {
  const {
    oauthClientId,
    ltiContext,
    links,
    onTreeChange,
    onBookPreviewClick,
    onBookEditClick,
    isContentEditable,
  } = props;
  const treeItemClasses = useTreeItemStyle();
  const nodeId = [oauthClientId, ltiContext.id]
    .map(encodeURIComponent)
    .join(":");
  const [linksSet, updateLinksSet] = useState<Set<LinkSchema>>(new Set());
  const checked = linksSet.size === links.length;

  return (
    <TreeItem
      nodeId={nodeId}
      classes={treeItemClasses}
      label={
        <>
          {onTreeChange && (
            <Checkbox
              checked={checked}
              indeterminate={!checked && linksSet.size > 0}
              color="primary"
              size="small"
              onClick={(e) => {
                // NOTE: TreeItemの展開をさせない
                e.stopPropagation();
              }}
              onChange={(event, checked) => {
                event.stopPropagation();
                updateLinksSet(checked ? new Set(links) : new Set());
                links.forEach((link) => {
                  onTreeChange(link, checked);
                });
              }}
            />
          )}
          {ltiContext.title}
        </>
      }
    >
      <LinksTree
        links={links}
        linksSet={linksSet}
        updateLinksSet={updateLinksSet}
        onTreeChange={onTreeChange}
        onBookPreviewClick={onBookPreviewClick}
        onBookEditClick={onBookEditClick}
        isContentEditable={isContentEditable}
      />
    </TreeItem>
  );
}
