import Method from "$server/types/method";
import { BookProps } from "$server/models/book";
import { BookParams } from "$server/validators/bookParams";
import { authInstructorHandler } from "$server/utils/authInstructorHandler";
import { showSchema, show } from "./show";
import { createSchema, create } from "./create";
import { updateSchema, update } from "./update";
import { destroySchema, destroy } from "./destroy";

export type Params = BookParams;
export type Props = BookProps;

export const method: Method = {
  get: showSchema,
  post: createSchema,
  put: updateSchema,
  delete: destroySchema,
};

export const preHandler = authInstructorHandler;

export { show, create, update, destroy };
