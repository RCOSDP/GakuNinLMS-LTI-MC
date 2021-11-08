import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import strip from "strip-markdown";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import EditButton from "$atoms/EditButton";
import DescriptionList from "$atoms/DescriptionList";
import SharedIndicator from "$atoms/SharedIndicator";
import type { Content } from "$types/content";
import { primary, gray } from "$theme/colors";
import useLineClampStyles from "$styles/lineClamp";
import getLocaleDateString from "$utils/getLocaleDateString";
import getLocaleListString from "$utils/getLocaleListString";
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
  content: Content;
  onContentPreviewClick(content: Content): void;
  onContentEditClick(content: Content): void;
};

export default function ContentPreview(props: Props) {
  const lineClamp = useLineClampStyles({
    fontSize: "0.75rem",
    lineClamp: 2,
    lineHeight: 1.5,
  });
  const {
    content,
    onContentPreviewClick,
    onContentEditClick,
    checked,
    ...checkboxProps
  } = props;
  const { ref, inView } = useInView({ rootMargin: "100px", triggerOnce: true });
  const checkable = "onChange" in checkboxProps;
  const handle = (handler: (content: Content) => void) => () => {
    handler(content);
  };
  const oembed = useOembed(
    "resource" in content
      ? content.resource.id
      : content.sections[0].topics[0].resource.id
  );
  return (
    <Preview className={clsx({ selected: checked })}>
      <Header
        checkable={checkable}
        id={`ContentPreview-${"sections" in content ? "book" : "topic"}:${
          content.id
        }`}
        checked={checked}
        {...checkboxProps}
        title={content.name}
        sx={{ mx: 2, my: 1 }}
      >
        {content.shared && <SharedIndicator className="shared" />}
        <EditButton
          className="edit-button"
          variant={"sections" in content ? "book" : "topic"}
          onClick={handle(onContentEditClick)}
        />
      </Header>
      <CardActionArea onClick={handle(onContentPreviewClick)}>
        <div ref={ref}>
          <CardMedia
            component="img"
            height={180}
            image={
              inView && oembed
                ? oembed.thumbnail_url
                : `${NEXT_PUBLIC_BASE_PATH}/video-thumbnail-placeholder.png`
            }
            alt="サムネイル"
          />
        </div>
        <DescriptionList
          nowrap
          sx={{ mx: 2, mt: 1, mb: 0.25 }}
          value={[
            {
              key: "更新日",
              value: getLocaleDateString(content.updatedAt, "ja"),
            },
            {
              key: "著者",
              value: getLocaleListString(
                content.authors.map(({ name }) => name),
                "ja"
              ),
            },
          ]}
        />
        <Description
          className={clsx(
            "description",
            lineClamp.clamp,
            lineClamp.placeholder
          )}
          sx={{ mx: 2, my: 1 }}
        >
          <Markdown
            remarkPlugins={[gfm, [strip, { keep: ["delete"] }]]}
            allowedElements={["del"]}
            unwrapDisallowed
          >
            {content.description}
          </Markdown>
        </Description>
      </CardActionArea>
    </Preview>
  );
}
