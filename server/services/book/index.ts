import Method from "$server/types/method";
import { BookParams } from "$server/validators/bookParams";
import { authInstructorHandler } from "$server/utils/authInstructorHandler";
import { showSchema, show } from "./show";

export type Params = BookParams;

export const method: Method = {
  get: showSchema,
};

export const preHandler = authInstructorHandler;

export const service = { get: show };
