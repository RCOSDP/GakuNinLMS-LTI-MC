import book from "./book";
import type { ActivitiesByBookSchema } from "$server/models/activitiesByBook";

const activitiesByBook: ActivitiesByBookSchema = {
  id: book.id,
  name: book.name,
  completedCount: 80,
  incompletedCount: 30,
};

export default activitiesByBook;
