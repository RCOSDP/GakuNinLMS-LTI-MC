import { useState } from "react";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import LinkIcon from "@material-ui/icons/Link";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "$atoms/IconButton";
import PreviewButton from "$atoms/PreviewButton";
import EditButton from "$atoms/EditButton";
import CourseChip from "$atoms/CourseChip";
import SharedIndicator from "$atoms/SharedIndicator";
import DescriptionList from "$atoms/DescriptionList";
import Video from "$organisms/Video";
import useCardStyle from "styles/card";
import { BookSchema } from "$server/models/book";
import { TopicSchema } from "$server/models/topic";
import { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import { getSectionsOutline } from "$utils/outline";
import { gray } from "$theme/colors";
import useLineClampStyles from "$styles/lineClamp";
import getLocaleDateString from "$utils/getLocaleDateString";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "visible",
  },
  left: {
    flex: 1,
    paddingRight: theme.spacing(1),
  },
  right: {
    flexShrink: 0,
    width: "30%",
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
  },
  outline: {
    margin: 0,
    color: gray[700],
  },
  shared: {
    margin: theme.spacing(0, 1),
  },
  chips: {
    "& > *": {
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
  items: {
    "& > *": {
      display: "inline-block",
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
  linked: {
    position: "absolute",
    top: theme.spacing(-1),
    left: theme.spacing(1.5),
    zIndex: 1,
  },
}));

type Props = {
  book: BookSchema;
  linked?: boolean;
  onBookPreviewClick?(book: BookSchema): void;
  onBookEditClick?(book: BookSchema): void;
  onBookLinkClick?(book: BookSchema): void;
  onLinkedBookClick?(book: BookSchema): void;
  onLtiContextClick?(
    ltiResourceLink: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">
  ): void;
};

export default function BookPreview({
  book,
  linked = false,
  onBookPreviewClick,
  onBookEditClick,
  onBookLinkClick,
  onLinkedBookClick,
  onLtiContextClick,
}: Props) {
  const cardClasses = useCardStyle();
  const classes = useStyles();
  const titleClamp = useLineClampStyles({
    fontSize: "1.25rem",
    lineClamp: 2,
    lineHeight: 1.6,
  });
  const outlineClamp = useLineClampStyles({
    fontSize: "0.875rem",
    lineClamp: 3,
    lineHeight: 1.25,
  });
  const [topic] = useState<TopicSchema | undefined>(
    book.sections[0]?.topics[0]
  );
  const { ref, inView } = useInView({ rootMargin: "100px", triggerOnce: true });
  const handle = (handler?: (book: BookSchema) => void) => () => {
    handler?.(book);
  };
  return (
    <Card classes={cardClasses} className={classes.root}>
      {linked && (
        <Chip
          className={classes.linked}
          color="primary"
          size="small"
          icon={<LinkIcon />}
          label="このブックを提供中"
          onClick={handle(onLinkedBookClick)}
        ></Chip>
      )}
      <div className={classes.left}>
        <div className={clsx(classes.title, titleClamp.placeholder)}>
          <label className={titleClamp.clamp}>{book.name}</label>
          {book.shared && <SharedIndicator className={classes.shared} />}
          <PreviewButton
            variant="book"
            size="medium"
            onClick={handle(onBookPreviewClick)}
          />
          {onBookEditClick && (
            <EditButton
              variant="book"
              size="medium"
              onClick={handle(onBookEditClick)}
            />
          )}
          {!linked && onBookLinkClick && (
            <IconButton
              color="primary"
              tooltipProps={{ title: "このブックを提供" }}
              onClick={handle(onBookLinkClick)}
            >
              <LinkIcon />
            </IconButton>
          )}
        </div>
        <div className={classes.chips}>
          {book.ltiResourceLinks.map((ltiResourceLink, index) => (
            <CourseChip
              key={index}
              ltiResourceLink={ltiResourceLink}
              onLtiResourceLinkClick={onLtiContextClick}
            />
          ))}
        </div>
        <DescriptionList
          className={classes.items}
          nowrap
          value={[
            { key: "作成日", value: getLocaleDateString(book.createdAt, "ja") },
            { key: "更新日", value: getLocaleDateString(book.updatedAt, "ja") },
            { key: "作成者", value: book.author.name },
          ]}
        />
        <p
          className={clsx(
            classes.outline,
            outlineClamp.clamp,
            outlineClamp.placeholder
          )}
        >
          {getSectionsOutline(book.sections)}
        </p>
      </div>
      <div ref={ref} className={classes.right}>
        {topic && "providerUrl" in topic.resource && inView && (
          <Video {...topic.resource} />
        )}
      </div>
    </Card>
  );
}
