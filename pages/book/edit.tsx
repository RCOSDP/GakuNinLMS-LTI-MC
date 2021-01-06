import { useState } from "react";
import { useRouter } from "next/router";
import { BookProps, BookSchema } from "$server/models/book";
import { TopicSchema } from "$server/models/topic";
import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import BookEdit from "$templates/BookEdit";
import Placeholder from "$templates/Placeholder";
import Unknown from "$templates/Unknown";
import { destroyBook, updateBook, useBook } from "$utils/book";

export type Query = {
  id?: string;
  prev?: "/books";
};

function Edit({ id, prev }: Pick<BookSchema, "id"> & Pick<Query, "prev">) {
  const book = useBook(id);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<TopicSchema | null>(null);
  async function handleSubmit(props: BookProps) {
    await updateBook({ id, ...props });
    switch (prev) {
      case "/books":
        return router.push(prev);
      default:
        return router.push({ pathname: "/book", query: { id } });
    }
  }
  function handleTopicClick(topic: TopicSchema) {
    setTopic(topic);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  async function handleDelete({ id }: Pick<BookSchema, "id">) {
    await destroyBook(id);
    return router.push("/books");
  }

  if (!book) return <Placeholder />;

  return (
    <>
      <BookEdit
        book={book}
        onSubmit={handleSubmit}
        onTopicClick={handleTopicClick}
        onDelete={handleDelete}
      />
      {topic && (
        <TopicPreviewDialog open={open} onClose={handleClose} topic={topic} />
      )}
    </>
  );
}

function Router() {
  const router = useRouter();
  const query: Query = router.query;
  const id = Number(query.id);

  if (!Number.isFinite(id))
    return (
      <Unknown header="ブックがありません">
        ブックが見つかりませんでした
      </Unknown>
    );

  return <Edit id={id} prev={query.prev} />;
}

export default Router;
