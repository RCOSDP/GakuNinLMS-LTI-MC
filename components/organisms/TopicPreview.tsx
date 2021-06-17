import { ReactNode } from "react";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import strip from "strip-markdown";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "$atoms/IconButton";
import DescriptionList from "$atoms/DescriptionList";
import SharedIndicator from "$atoms/SharedIndicator";
import Video from "$organisms/Video";
import { TopicSchema } from "$server/models/topic";
import { primary, gray } from "$theme/colors";
import useLineClampStyles from "$styles/lineClamp";
import getLocaleDateString from "$utils/getLocaleDateString";

const useCardStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${gray[400]}`,
    borderRadius: 12,
    boxShadow: "none",
    padding: theme.spacing(1, 2),
  },
}));

const useCheckableHeaderStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontWeight: 500,
  },
  checkbox: {
    marginLeft: theme.spacing(-1.5),
  },
}));

function CheckableHeader(
  props: Parameters<typeof Checkbox>[0] & {
    checkable: boolean;
    children: ReactNode;
    title: string;
  }
) {
  const { checkable, children, title, ...checkboxProps } = props;
  const classes = useCheckableHeaderStyles();
  const lineClamp = useLineClampStyles({
    fontSize: "0.875rem",
    lineClamp: 2,
    lineHeight: 1.375,
  });

  if (!checkable)
    return (
      <div className={clsx(classes.root, lineClamp.placeholder)}>
        <h6 className={clsx(classes.title, lineClamp.clamp)}>{title}</h6>
        {children}
      </div>
    );

  return (
    <div className={clsx(classes.root, lineClamp.placeholder)}>
      <Checkbox
        className={classes.checkbox}
        size="small"
        color="primary"
        {...checkboxProps}
      />
      <label
        className={clsx(classes.title, lineClamp.clamp)}
        htmlFor={checkboxProps.id}
      >
        {title}
      </label>
      {children}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > :not(:last-child)": {
      marginBottom: theme.spacing(0.5),
    },
  },
  shared: {
    verticalAlign: "middle",
    margin: theme.spacing(0, 0.5),
  },
  editButton: {
    marginRight: theme.spacing(-1.5),
  },
  video: {
    margin: theme.spacing(0, -2),
  },
  description: {
    color: gray[700],
    margin: 0,
  },
  selected: {
    backgroundColor: primary[50],
  },
}));

type Props = Parameters<typeof Checkbox>[0] & {
  topic: TopicSchema;
  onTopicPreviewClick(topic: TopicSchema): void;
  onTopicEditClick: ((topic: TopicSchema) => void) | false | undefined;
};

export default function TopicPreview(props: Props) {
  const cardClasses = useCardStyles();
  const classes = useStyles();
  const lineClamp = useLineClampStyles({
    fontSize: "0.75rem",
    lineClamp: 2,
    lineHeight: 1.5,
  });
  const {
    topic,
    onTopicPreviewClick,
    onTopicEditClick,
    checked,
    ...checkboxProps
  } = props;
  const { ref, inView } = useInView({ rootMargin: "100px", triggerOnce: true });
  const checkable = "onChange" in checkboxProps;
  const handle = (handler: (topic: TopicSchema) => void) => () => {
    handler(topic);
  };
  return (
    <Card
      classes={cardClasses}
      className={clsx(classes.root, { [classes.selected]: checked })}
    >
      <CheckableHeader
        checkable={checkable}
        id={`TopicPreview-topic:${topic.id}`}
        checked={checked}
        {...checkboxProps}
        title={topic.name}
      >
        {topic.shared && <SharedIndicator className={classes.shared} />}
        <IconButton
          tooltipProps={{ title: "トピックをプレビュー" }}
          size="small"
          color="primary"
          onClick={handle(onTopicPreviewClick)}
        >
          <VisibilityOutlinedIcon />
        </IconButton>
        {onTopicEditClick && (
          <IconButton
            className={classes.editButton}
            tooltipProps={{ title: "トピックを編集" }}
            color="primary"
            size="small"
            onClick={handle(onTopicEditClick)}
          >
            <EditOutlinedIcon />
          </IconButton>
        )}
      </CheckableHeader>
      <div ref={ref}>
        {"providerUrl" in topic.resource && inView && (
          <Video className={classes.video} {...topic.resource} />
        )}
      </div>
      <DescriptionList
        nowrap
        value={[
          {
            key: "更新日",
            value: getLocaleDateString(topic.updatedAt, "ja"),
          },
          {
            key: "作成者",
            value: topic.creator.name,
          },
        ]}
      />
      <p
        className={clsx(
          classes.description,
          lineClamp.clamp,
          lineClamp.placeholder
        )}
      >
        <Markdown
          remarkPlugins={[gfm, [strip, { keep: ["delete"] }]]}
          allowedElements={["del"]}
          unwrapDisallowed
        >
          {topic.description}
        </Markdown>
      </p>
    </Card>
  );
}
