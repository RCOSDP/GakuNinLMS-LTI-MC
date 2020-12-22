import { Fragment } from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import { Section } from "$types/book";

type Props = {
  bookId?: string | number;
  sections: Section[];
  onItemClick(event: React.MouseEvent, index: [number, number]): void;
};

export default function BookChildrenTree(props: Props) {
  const { bookId = 0, sections, onItemClick } = props;
  const handleItemClick = (event: React.MouseEvent<HTMLElement>) => {
    const { section, topic } = event.currentTarget.dataset;
    onItemClick(event, [section, topic].map(Number) as [number, number]);
  };
  return (
    <>
      {sections.map((section, sectionIndex) => (
        <Fragment key={section.id}>
          {(section.name && (
            <TreeItem
              nodeId={`${bookId}-${section.id}`}
              label={
                <>
                  {sectionIndex + 1} {section.name}
                </>
              }
            >
              {section.topics.map((topic, topicIndex) => (
                <TreeItem
                  key={topic.id}
                  nodeId={`${bookId}-${section.id}-${topic.id}`}
                  label={
                    <>
                      {sectionIndex + 1}
                      {section.name ? `.${topicIndex + 1}` : ""} {topic.name}
                    </>
                  }
                  data-section={sectionIndex}
                  data-topic={topicIndex}
                  onClick={handleItemClick}
                />
              ))}
            </TreeItem>
          )) || (
            <>
              {section.topics.map((topic, topicIndex) => (
                <TreeItem
                  key={topic.id}
                  nodeId={`${bookId}-${section.id}-${topic.id}`}
                  label={
                    <>
                      {sectionIndex + 1}
                      {section.name ? `.${topicIndex + 1}` : ""} {topic.name}
                    </>
                  }
                  data-section={sectionIndex}
                  data-topic={topicIndex}
                  onClick={handleItemClick}
                />
              ))}
            </>
          )}
        </Fragment>
      ))}
    </>
  );
}
