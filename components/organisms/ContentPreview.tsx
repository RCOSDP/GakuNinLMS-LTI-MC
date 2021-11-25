import { Fragment } from "react";
import clsx from "clsx";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import strip from "strip-markdown";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import EditButton from "$atoms/EditButton";
import DescriptionList from "$atoms/DescriptionList";
import SharedIndicator from "$atoms/SharedIndicator";
import CourseChip from "$atoms/CourseChip";
import LinkSwitch from "$atoms/LinkSwitch";
import type { ContentSchema } from "$server/models/content";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { KeywordSchema } from "$server/models/keyword";
import { primary, gray } from "$theme/colors";
import useLineClampStyles from "$styles/lineClamp";
import { getSectionsOutline } from "$utils/outline";
import getLocaleDateString from "$utils/getLocaleDateString";
import { authors } from "$utils/descriptionList";
import useOembed from "$utils/useOembed";
import { NEXT_PUBLIC_BASE_PATH } from "$utils/env";

type HeaderProps = Parameters<typeof Checkbox>[0] & {
  checkable: boolean;
  children: React.ReactNode;
  className?: string;
  title: string;
};

const Header = styled(
  ({
    checkable,
    children,
    className,
    title,
    ...checkboxProps
  }: HeaderProps) => {
    const lineClamp = useLineClampStyles({
      fontSize: "0.875rem",
      lineClamp: 2,
      lineHeight: 1.375,
    });

    if (!checkable)
      return (
        <header className={clsx(className, lineClamp.placeholder)}>
          <h6 className={clsx("title", lineClamp.clamp)}>{title}</h6>
          {children}
        </header>
      );

    return (
      <div className={clsx(className, lineClamp.placeholder)}>
        <Checkbox
          className="checkbox"
          size="small"
          color="primary"
          {...checkboxProps}
        />
        <label
          className={clsx("title", lineClamp.clamp)}
          htmlFor={checkboxProps.id}
        >
          {title}
        </label>
        {children}
      </div>
    );
  }
)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  ".title": {
    flex: 1,
    fontWeight: 500,
  },
  ".checkbox": {
    marginLeft: theme.spacing(-1.5),
  },
}));

const LinkArea = styled("div")({
  position: "relative",
});

const Description = styled("p")({
  color: gray[700],
  margin: 0,
});

const Preview = styled(Card)(({ theme }) => ({
  border: `1px solid ${gray[400]}`,
  borderRadius: 12,
  boxShadow: "none",
  ".shared": {
    verticalAlign: "middle",
    margin: theme.spacing(0, 0.5),
  },
  ".edit-button": {
    marginRight: theme.spacing(-1.5),
  },
  ".video": {
    margin: theme.spacing(0, -2),
  },
  "&.selected": {
    backgroundColor: primary[50],
  },
}));

type Props = Parameters<typeof Checkbox>[0] & {
  content: ContentSchema;
  onContentPreviewClick(content: ContentSchema): void;
  onContentEditClick?(content: ContentSchema): void;
  onContentLinkClick?(content: ContentSchema): void;
  onLtiContextClick?(
    ltiResourceLink: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">
  ): void;
  onKeywordClick(keyword: Pick<KeywordSchema, "name">): void;
  linked?: boolean;
};

export default function ContentPreview({
  content,
  onContentPreviewClick,
  onContentEditClick,
  onContentLinkClick,
  onLtiContextClick,
  onKeywordClick,
  linked = content.type === "book" ? false : undefined,
  checked,
  ...checkboxProps
}: Props) {
  const lineClamp = useLineClampStyles({
    fontSize: "0.75rem",
    lineClamp: 2,
    lineHeight: 1.5,
  });
  const checkable = "onChange" in checkboxProps;
  const handle = (handler: (content: ContentSchema) => void) => () => {
    handler(content);
  };
  const oembed = useOembed(
    content.type === "topic"
      ? content.resource.id
      : content.sections[0]?.topics[0]?.resource.id
  );
  const handleContentLinkClick = () => onContentLinkClick?.(content);
  const handleKeywordClick = (keyword: Pick<KeywordSchema, "name">) => () =>
    onKeywordClick(keyword);
  return (
    <Preview className={clsx({ selected: checked })}>
      <Header
        checkable={checkable}
        id={`ContentPreview-${content.type}:${content.id}`}
        checked={checked}
        {...checkboxProps}
        title={content.name}
        sx={{ mx: 2, my: 1 }}
      >
        {content.shared && <SharedIndicator className="shared" />}
        {onContentEditClick && (
          <EditButton
            className="edit-button"
            variant={content.type}
            onClick={handle(onContentEditClick)}
          />
        )}
      </Header>
      <CardActionArea onClick={handle(onContentPreviewClick)}>
        <CardMedia
          component="img"
          height={180}
          image={
            oembed
              ? oembed.thumbnail_url
              : `${NEXT_PUBLIC_BASE_PATH}/video-thumbnail-placeholder.png`
          }
          alt="サムネイル"
        />
      </CardActionArea>
      {linked !== undefined && onContentLinkClick && (
        <LinkArea>
          <LinkSwitch
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translateY(50%)",
            }}
            checked={linked}
            onChange={handleContentLinkClick}
          />
        </LinkArea>
      )}
      <DescriptionList
        nowrap
        sx={{ mx: 2, my: 1 }}
        value={[
          {
            key: "更新日",
            value: getLocaleDateString(content.updatedAt, "ja"),
          },
          ...authors(content),
          ...(content.type === "book" && content.ltiResourceLinks.length > 0
            ? [
                {
                  key: "リンク",
                  value: (
                    <Fragment>
                      {content.ltiResourceLinks.map(
                        (ltiResourceLink, index) => (
                          <CourseChip
                            key={index}
                            ltiResourceLink={ltiResourceLink}
                            onLtiResourceLinkClick={onLtiContextClick}
                          />
                        )
                      )}
                    </Fragment>
                  ),
                },
              ]
            : []),
        ]}
      />
      <Box sx={{ mx: 2, my: 1 }}>
        {content.keywords.map((keyword) => (
          <Chip
            key={keyword.id}
            onClick={handleKeywordClick(keyword)}
            clickable
            variant="outlined"
            color="primary"
            label={keyword.name}
            size="small"
            sx={{ mr: 0.5, borderRadius: 1 }}
          />
        ))}
      </Box>
      <Description
        className={clsx("description", lineClamp.clamp, lineClamp.placeholder)}
        sx={{ mx: 2, my: 1 }}
      >
        <Markdown
          remarkPlugins={[gfm, [strip, { keep: ["delete"] }]]}
          allowedElements={["del"]}
          unwrapDisallowed
        >
          {content.type === "book"
            ? getSectionsOutline(content.sections)
            : content.description}
        </Markdown>
      </Description>
    </Preview>
  );
}