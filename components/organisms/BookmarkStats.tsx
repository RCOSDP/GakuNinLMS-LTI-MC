import type { ReactNode } from "react";
import type { BookmarkSchema, BookmarkTagMenu } from "$server/models/bookmark";
import type { BookSchema } from "$server/models/book";

function List(props: { children: ReactNode }) {
  return <ul>{props.children}</ul>;
}

function ListItem(props: {
  name: string;
  bookmarks: Array<BookmarkSchema>;
  bookmarkTagMenu: BookmarkTagMenu;
}) {
  return (
    <li>
      {props.name}
      <ul>
        {props.bookmarkTagMenu.map((t) => {
          const count = props.bookmarks.filter((b) => b.tagId === t.id).length;

          return (
            <li key={t.id}>
              {t.label} {count}
            </li>
          );
        })}
      </ul>
    </li>
  );
}

function BookmarkStats(props: {
  book: Pick<BookSchema, "name">;
  children: ReactNode;
}) {
  return (
    <>
      <h2>{props.book.name}</h2>
      {props.children}
    </>
  );
}

export default Object.assign(BookmarkStats, {
  List,
  ListItem,
});
