import IconButton from "@material-ui/core/IconButton";
import TreeItem from "@material-ui/lab/TreeItem";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CourseChip from "$atoms/CourseChip";
import BookChildrenTree from "$molecules/BookChildrenTree";
import { Book } from "$types/book";

type Props = {
  book: Book;
  onItemClick(index: [number, number]): void;
};

export default function BookTree(props: Props) {
  const { book, onItemClick } = props;
  return (
    <TreeItem
      nodeId={`${book.id}`}
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
      <BookChildrenTree
        bookId={book.id}
        sections={book.sections}
        onItemClick={onItemClick}
      />
    </TreeItem>
  );
}
