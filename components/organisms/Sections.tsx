import { ReactNode, MouseEvent } from "react";
import clsx from "clsx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Typography from "@mui/material/Typography";
import { makeStyles, createStyles } from "@mui/styles";
import type { Theme } from "@mui/material/styles";
import EditButton from "$atoms/EditButton";
import { ContentAuthors } from "$types/content";
import { SectionSchema } from "$server/models/book/section";
import { primary, gray } from "$theme/colors";
import { isNamedSection, getOutlineNumber } from "$utils/outline";
import formatInterval from "$utils/formatInterval";

function SectionItem({
  section,
  sectionItemIndex,
  children,
}: {
  section: Pick<SectionSchema, "name" | "topics">;
  sectionItemIndex: number;
  children: ReactNode;
}) {
  const classes = useStyles();
  if (!isNamedSection(section)) return <List disablePadding>{children}</List>;

  return (
    <List className={classes.indent}>
      <ListItem dense>
        <span className={clsx(classes.outline, classes.outlineNumber)}>
          {getOutlineNumber(section, sectionItemIndex)}
        </span>
        <ListItemText
          className={clsx(classes.ellipsis, classes.outline)}
          disableTypography
        >
          {section.name}
        </ListItemText>
      </ListItem>
      {children}
    </List>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outline: {
      color: gray[800],
      fontSize: "0.75rem",
      fontWeight: "bold",
      lineHeight: 1.25,
    },
    outlineNumber: {
      marginRight: theme.spacing(1),
    },
    ellipsis: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    columns: {
      display: "flex",
      flexDirection: "column",
    },
    topic: {
      fontSize: "0.875rem",
    },
    indent: {
      "& > :not(:first-child) $outlineNumber": {
        marginLeft: `${0.875 * 1.2}rem`,
      },
    },
    active: {
      backgroundColor: primary[50],
    },
  })
);

type Props = {
  className?: string;
  sections: SectionSchema[];
  index: ItemIndex;
  isContentEditable(topic: ContentAuthors): boolean;
  onItemClick(index: ItemIndex): void;
  onItemEditClick?(index: ItemIndex): void;
};

export default function Sections({
  className,
  sections,
  index: [sectionIndex, topicIndex],
  isContentEditable,
  onItemClick,
  onItemEditClick,
}: Props) {
  const classes = useStyles();
  const handleItemClick = (index: ItemIndex) => () => onItemClick(index);
  const handleItemEditClick =
    (index: ItemIndex) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onItemEditClick?.(index);
    };
  return (
    <div className={className}>
      {sections.map((section, sectionItemIndex) => (
        <SectionItem
          key={section.id}
          section={section}
          sectionItemIndex={sectionItemIndex}
        >
          {section.topics.map((topic, topicItemIndex) => (
            <ListItem
              key={`${topic.id}:${topicItemIndex}`}
              className={clsx({
                [classes.active]:
                  sectionIndex === sectionItemIndex &&
                  topicIndex === topicItemIndex,
              })}
              button
              onClick={handleItemClick([sectionItemIndex, topicItemIndex])}
            >
              <span className={clsx(classes.outline, classes.outlineNumber)}>
                {getOutlineNumber(section, sectionItemIndex, topicItemIndex)}
              </span>
              <ListItemText className={classes.columns} disableTypography>
                <span className={clsx(classes.topic, classes.ellipsis)}>
                  {topic.name}
                </span>
                <Typography component="span" variant="caption">
                  {formatInterval(0, topic.timeRequired * 1000)}
                </Typography>
              </ListItemText>
              {isContentEditable(topic) && onItemEditClick && (
                <ListItemSecondaryAction>
                  <EditButton
                    variant="topic"
                    size="medium"
                    onClick={handleItemEditClick([
                      sectionItemIndex,
                      topicItemIndex,
                    ])}
                  />
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </SectionItem>
      ))}
    </div>
  );
}
