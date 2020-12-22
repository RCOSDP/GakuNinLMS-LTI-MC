import { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import TreeItem from "@material-ui/lab/TreeItem";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CourseChip from "$atoms/CourseChip";
import { Book } from "$types/book";

type Props = {
  book: Book;
  onItemClick(event: React.MouseEvent, index: [number, number]): void;
};

export default function BookTree(props: Props) {
  const { book, onItemClick } = props;
  const handleItemClick = (event: React.MouseEvent<HTMLElement>) => {
    const { section, topic } = event.currentTarget.dataset;
    onItemClick(event, [section, topic].map(Number) as [number, number]);
  };
  return (
    <TreeItem
      nodeId={book.id.toString()}
      label={
        <>
          {book.name}
          <IconButton size="small">
            <InfoOutlinedIcon />
          </IconButton>
          <IconButton size="small">
            <EditOutlinedIcon />
          </IconButton>
          {book.ltiResourceLinks.map((ltiResourceLink) => (
            <CourseChip
              key={ltiResourceLink.contextId}
              ltiResourceLink={ltiResourceLink}
            />
          ))}
        </>
      }
    >
      {book.sections.map((section, sectionIndex) => (
        <Fragment key={section.id}>
          {(section.name && (
            <TreeItem
              nodeId={`${book.id}-${section.id}`}
              label={
                <>
                  {sectionIndex + 1} {section.name}
                </>
              }
            >
              {section.topics.map((topic, topicIndex) => (
                <TreeItem
                  key={topic.id}
                  nodeId={`${book.id}-${section.id}-${topic.id}`}
                  label={
                    <>
                      {sectionIndex + 1}
                      {section.name ? `.${topicIndex + 1}` : ""} {topic.name}
                    </>
                  }
                  onClick={handleItemClick}
                />
              ))}
            </TreeItem>
          )) || (
            <>
              {section.topics.map((topic, topicIndex) => (
                <TreeItem
                  key={topic.id}
                  nodeId={`${book.id}-${section.id}-${topic.id}`}
                  label={
                    <>
                      {sectionIndex + 1}
                      {section.name ? `.${topicIndex + 1}` : ""} {topic.name}
                    </>
                  }
                  onClick={handleItemClick}
                />
              ))}
            </>
          )}
        </Fragment>
      ))}
    </TreeItem>
  );
}
