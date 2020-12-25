import { Fragment } from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import { SectionSchema } from "$server/models/book/section";

type Props = {
  bookId?: string | number;
  sections: SectionSchema[];
  onItemClick(index: [number, number]): void;
};

export default function BookChildrenTree(props: Props) {
  const { bookId = 0, sections, onItemClick } = props;
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
              {section.topics.map((topic, topicIndex) => {
                const handleItemClick = () => {
                  onItemClick([sectionIndex, topicIndex]);
                };
                return (
                  <TreeItem
                    key={topic.id}
                    nodeId={`${bookId}-${section.id}-${topic.id}`}
                    label={
                      <>
                        {sectionIndex + 1}
                        {section.name ? `.${topicIndex + 1}` : ""} {topic.name}
                      </>
                    }
                    onClick={handleItemClick}
                  />
                );
              })}
            </TreeItem>
          )) || (
            <>
              {section.topics.map((topic, topicIndex) => {
                const handleItemClick = () => {
                  onItemClick([sectionIndex, topicIndex]);
                };
                return (
                  <TreeItem
                    key={topic.id}
                    nodeId={`${bookId}-${section.id}-${topic.id}`}
                    label={
                      <>
                        {sectionIndex + 1}
                        {section.name ? `.${topicIndex + 1}` : ""} {topic.name}
                      </>
                    }
                    onClick={handleItemClick}
                  />
                );
              })}
            </>
          )}
        </Fragment>
      ))}
    </>
  );
}
