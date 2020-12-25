export default { title: "templates/BookEdit" };

import { useState } from "react";
import BookEdit from "./BookEdit";
import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import { book } from "samples";
import { TopicSchema } from "$server/models/topic";

const handleTopicClick = console.log;
const handleSubmit = console.log;

export const Default = () => {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<TopicSchema | null>(null);
  const handleTopicClick = (topic: TopicSchema) => {
    setTopic(topic);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <BookEdit
        book={book}
        onSubmit={handleSubmit}
        onTopicClick={handleTopicClick}
      />
      {topic && (
        <TopicPreviewDialog open={open} onClose={handleClose} topic={topic} />
      )}
    </>
  );
};

export const Empty = () => (
  <BookEdit
    book={null}
    onSubmit={handleSubmit}
    onTopicClick={handleTopicClick}
  />
);
