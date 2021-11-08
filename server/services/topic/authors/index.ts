import type { AuthorsProps } from "$server/models/authorsProps";
import type { TopicParams } from "$server/validators/topicParams";
import { updateSchema, updateHooks, update } from "./update";

export type Params = TopicParams;
export type Props = AuthorsProps;

export const method = {
  put: updateSchema,
};

export const hooks = {
  put: updateHooks,
};

export { update };
