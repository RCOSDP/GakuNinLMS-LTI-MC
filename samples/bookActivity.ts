import book from "./book";
import activity from "./activity";
import type { BookActivitySchema } from "$server/models/bookActivity";

const { completed, ...activityWithoutCompleted } = activity;

const bookActivity: BookActivitySchema = {
  ...activityWithoutCompleted,
  book: {
    id: book.id,
    name: book.name,
  },
  get status() {
    return (["completed", "incompleted"] as const)[
      Math.floor(Math.random() * 2)
    ];
  },
};

export default bookActivity;
