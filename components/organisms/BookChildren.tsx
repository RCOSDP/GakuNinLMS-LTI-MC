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

function Section({
  section,
  sectionItemIndex,
  end,
  onSectionClick,
  children,
}: {
  section: Pick<SectionSchema, "name" | "topics">;
  sectionItemIndex: number;
  end: boolean;
  onSectionClick(event: MouseEvent<HTMLElement>): void;
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
        onClick={onSectionClick}
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
  onItemClick(event: MouseEvent<HTMLElement>, index: ItemIndex): void;
  onItemEditClick?(event: MouseEvent<HTMLElement>, index: ItemIndex): void;
};

export default function BookChildren(props: Props) {
  const {
    className,
    sections,
    index: [sectionIndex, topicIndex],
    isTopicEditable,
    onItemClick,
    onItemEditClick,
  } = props;
  const classes = useStyles();
  const handleItemClick = (event: MouseEvent<HTMLElement>) => {
    const { section, topic } = event.currentTarget.dataset;
    onItemClick(event, ([section, topic].map(Number) as unknown) as ItemIndex);
  };
  const handleSectionClick = (sectionItemIndex: number) => (
    event: MouseEvent<HTMLElement>
  ) => onItemClick(event, [sectionItemIndex, 0]);
  const handleItemEditClick = (...index: ItemIndex) => (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    onItemEditClick?.(event, index);
  };
  return (
    <List disablePadding className={className}>
      {sections.map((section, sectionItemIndex) => (
        <Section
          key={section.id}
          section={section}
          sectionItemIndex={sectionItemIndex}
          end={sectionItemIndex === sections.length - 1}
          onSectionClick={handleSectionClick(sectionItemIndex)}
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
              data-section={sectionItemIndex}
              data-topic={topicItemIndex}
              onClick={handleItemClick}
            >
              {isTopicEditable(topic) && onItemEditClick && (
                <ListItemSecondaryAction>
                  <EditButton
                    variant="topic"
                    size="medium"
                    onClick={handleItemEditClick(
                      sectionItemIndex,
                      topicItemIndex
                    )}
                  />
                </ListItemSecondaryAction>
              )}
            </BookChildrenItem>
          ))}
        </Section>
      ))}
    </List>
  );
}
