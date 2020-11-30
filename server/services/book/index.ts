import Method from "$server/types/method";
import { BookParams } from "$server/validators/bookParams";
import { showSchema, show } from "./show";

export type Params = BookParams;

export const method: Method = {
  get: showSchema,
};

export const service = { get: show };
