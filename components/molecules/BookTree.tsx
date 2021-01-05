import IconButton from "@material-ui/core/IconButton";
import TreeItem from "@material-ui/lab/TreeItem";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CourseChip from "$atoms/CourseChip";
import BookChildrenTree from "$molecules/BookChildrenTree";
import { BookSchema } from "$server/models/book";

type Props = {
  book: BookSchema;
  onItemClick(index: [number, number]): void;
  onInfoClick?(): void;
};

export default function BookTree(props: Props) {
  const { book, onItemClick, onInfoClick = () => undefined } = props;
  const handleInfoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onInfoClick();
  };
  return (
    <TreeItem
      nodeId={`${book.id}`}
      label={
        <>
          {book.name}
          <IconButton size="small" onClick={handleInfoClick}>
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
      <BookChildrenTree
        bookId={book.id}
        sections={book.sections}
        onItemClick={onItemClick}
      />
    </TreeItem>
  );
}
