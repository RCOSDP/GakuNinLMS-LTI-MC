import { ReactNode, MouseEvent } from "react";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { makeStyles } from "@material-ui/styles";
import EditButton from "$atoms/EditButton";
import BookChildrenItem from "$atoms/BookChildrenItem";
import { TopicSchema } from "$server/models/topic";
import { SectionSchema } from "$server/models/book/section";
import { primary } from "$theme/colors";
import { isNamedSection, getOutlineNumber } from "$utils/outline";

function SectionItem({
  section,
  sectionItemIndex,
  end,
  onSectionItemClick,
  children,
}: {
  section: Pick<SectionSchema, "name" | "topics">;
  sectionItemIndex: number;
  end: boolean;
  onSectionItemClick(): void;
  children: ReactNode;
}) {
  if (!isNamedSection(section)) return <>{children}</>;

  return (
    <>
      <BookChildrenItem
        variant="section"
        outlineNumber={getOutlineNumber(section, sectionItemIndex)}
        name={section.name}
        end={end}
        button
        onClick={onSectionItemClick}
      />
      {children}
    </>
  );
}

const useStyles = makeStyles({
  active: {
    backgroundColor: primary[50],
  },
});

type Props = {
  className?: string;
  sections: SectionSchema[];
  index: ItemIndex;
  isTopicEditable(topic: TopicSchema): boolean;
  onItemClick(index: ItemIndex): void;
  onItemEditClick?(index: ItemIndex): void;
};

export default function BookChildren({
  className,
  sections,
  index: [sectionIndex, topicIndex],
  isTopicEditable,
  onItemClick,
  onItemEditClick,
}: Props) {
  const classes = useStyles();
  const handleItemClick = (index: ItemIndex) => () => onItemClick(index);
  const handleSectionItemClick = (sectionItemIndex: number) => () =>
    onItemClick([sectionItemIndex, 0]);
  const handleItemEditClick = (index: ItemIndex) => (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    onItemEditClick?.(index);
  };
  return (
    <List disablePadding className={className}>
      {sections.map((section, sectionItemIndex) => (
        <SectionItem
          key={section.id}
          section={section}
          sectionItemIndex={sectionItemIndex}
          end={sectionItemIndex === sections.length - 1}
          onSectionItemClick={handleSectionItemClick(sectionItemIndex)}
        >
          {section.topics.map((topic, topicItemIndex) => (
            <BookChildrenItem
              key={`${topic.id}:${topicItemIndex}`}
              className={clsx({
                [classes.active]:
                  sectionIndex === sectionItemIndex &&
                  topicIndex === topicItemIndex,
              })}
              variant="topic"
              outlineNumber={getOutlineNumber(
                section,
                sectionItemIndex,
                topicItemIndex
              )}
              name={topic.name}
              end={
                (section.topics.length > 1 &&
                  topicItemIndex === section.topics.length - 1) ||
                (section.topics.length === 1 &&
                  sectionItemIndex === sections.length - 1)
              }
              depth={section.topics.length > 1 ? 1 : 0}
              button
              onClick={handleItemClick([sectionItemIndex, topicItemIndex])}
            >
              {isTopicEditable(topic) && onItemEditClick && (
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
            </BookChildrenItem>
          ))}
        </SectionItem>
      ))}
    </List>
  );
}
