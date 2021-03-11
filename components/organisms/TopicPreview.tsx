import { ReactNode } from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Video from "$organisms/Video";
import Item from "$atoms/Item";
import { TopicSchema } from "$server/models/topic";
import { primary, gray } from "theme/colors";

const useCardStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${gray[400]}`,
    borderRadius: 12,
    boxShadow: "none",
    padding: theme.spacing(1, 2),
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    "& > :not(:last-child)": {
      marginBottom: theme.spacing(0.5),
    },
  },
  header: {
    display: "flex",
    height: "calc(0.875rem * 2 * 1.375)",
    fontSize: "0.875rem",
    lineHeight: 1.375,
    alignItems: "center",
  },
  title: {
    flex: 1,
    maxHeight: "calc(0.875rem * 2 * 1.375)",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  },
  checkbox: {
    marginLeft: theme.spacing(-1.5),
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
    fontSize: "0.75rem",
    lineHeight: 1.43,
    maxHeight: "calc(0.75rem * 2 * 1.43)",
    overflow: "hidden",
  },
  selected: {
    backgroundColor: primary[50],
  },
}));

function CheckableTitle(
  props: Parameters<typeof Checkbox>[0] & {
    checkable: boolean;
    children: ReactNode;
  }
) {
  const { checkable, children, ...checkboxProps } = props;
  const classes = useStyles();

  if (!checkable) return <span className={classes.title}>{children}</span>;

  return (
    <>
      <Checkbox
        className={classes.checkbox}
        size="small"
        color="primary"
        {...checkboxProps}
      />
      <label className={classes.title} htmlFor={checkboxProps.id}>
        {children}
      </label>
    </>
  );
}

type Props = Parameters<typeof Checkbox>[0] & {
  topic: TopicSchema;
  onTopicDetailClick(topic: TopicSchema): void;
  onTopicEditClick: ((topic: TopicSchema) => void) | false | undefined;
};

export default function TopicPreview(props: Props) {
  const cardClasses = useCardStyles();
  const classes = useStyles();
  const {
    topic,
    onTopicDetailClick,
    onTopicEditClick,
    checked,
    ...checkboxProps
  } = props;
  const checkable = "onChange" in checkboxProps;
  const handle = (handler: (topic: TopicSchema) => void) => () => {
    handler(topic);
  };
  return (
    <Card
      classes={cardClasses}
      className={clsx(classes.root, { [classes.selected]: checked })}
    >
      <Typography variant="h6" className={classes.header}>
        <CheckableTitle
          checkable={checkable}
          id={`TopicPreview-topic:${topic.id}`}
          checked={checked}
          {...checkboxProps}
        >
          {topic.name}
        </CheckableTitle>
        {onTopicEditClick && (
          <IconButton
            className={classes.editButton}
            color="primary"
            size="small"
            onClick={handle(onTopicEditClick)}
          >
            <EditOutlinedIcon />
          </IconButton>
        )}
      </Typography>
      {"providerUrl" in topic.resource && (
        <Video className={classes.video} {...topic.resource} />
      )}
      <Item itemKey="作成者" value={topic.creator.name} />
      <p className={classes.description}>{topic.description}</p>
      <Button size="small" color="primary" onClick={handle(onTopicDetailClick)}>
        もっと詳しく...
      </Button>
    </Card>
  );
}
