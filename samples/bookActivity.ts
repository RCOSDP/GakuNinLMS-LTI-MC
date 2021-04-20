import user from "./user";
import book from "./book";
import topic from "./topic";
import type { BookActivitySchema } from "$server/models/bookActivity";

const bookActivity: BookActivitySchema = {
  book: {
    id: book.id,
    name: book.name,
  },
  learner: {
    id: user.id,
    name: user.name,
  },
  topic: {
    id: topic.id,
    name: topic.name,
  },
  get status() {
    return (["completed", "incompleted"] as const)[
      Math.floor(Math.random() * 2)
    ];
  },
};

export default bookActivity;
