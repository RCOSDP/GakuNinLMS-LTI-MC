import { TopicProps } from "$server/models/topic";
import { TopicParams } from "$server/validators/topicParams";
import { showSchema, showHooks, show } from "./show";
import { createSchema, createHooks, create } from "./create";
import { updateSchema, updateHooks, update } from "./update";
import { destroySchema, destroyHooks, destroy } from "./destroy";

export type Params = TopicParams;
export type Props = TopicProps;

export const method = {
  get: showSchema,
  post: createSchema,
  put: updateSchema,
  delete: destroySchema,
};

export const hooks = {
  get: showHooks,
  post: createHooks,
  put: updateHooks,
  delete: destroyHooks,
};

export { show, create, update, destroy };
