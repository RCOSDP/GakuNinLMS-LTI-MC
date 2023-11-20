import { useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import type { BookSchema } from "$server/models/book";
import useCardStyles from "$styles/card";
import { useBook } from "$utils/book";
import { useBookmarksByTopicId } from "$utils/bookmark/useBookmarks";
import BookmarkStats from "./BookmarkStats";

function ListItem(topic: { id: number; name: string }) {
  const data = useBookmarksByTopicId({ topicId: topic.id, isAllUsers: true });
  if (data.isLoading) return null;

  return (
    <BookmarkStats.ListItem
      name={topic.name}
      bookmarks={data.bookmarks}
      bookmarkTagMenu={data.bookmarkTagMenu}
    />
  );
}

type Props = {
  book: Pick<BookSchema, "id" | "name"> & Partial<BookSchema>;
};

export default function BookmarkStatsDialog(props: Props) {
  const [open, setOpen] = useState(false);
  const cardClasses = useCardStyles();
  const { book } = useBook(props.book.id);
  const sections = props.book.sections ?? book?.sections ?? [];

  return (
    <>
      <Button variant="text" onClick={() => setOpen(true)}>
        {props.book.name}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ classes: cardClasses }}
        fullWidth
      >
        <BookmarkStats book={props.book}>
          <BookmarkStats.List>
            {sections
              .flatMap((s) => s.topics)
              .map((t, i) => (
                <ListItem key={i} {...t} />
              ))}
          </BookmarkStats.List>
        </BookmarkStats>
      </Dialog>
    </>
  );
}
