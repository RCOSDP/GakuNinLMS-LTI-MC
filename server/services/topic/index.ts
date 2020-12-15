import Method from "$server/types/method";
import { TopicProps } from "$server/models/topic";
import { TopicParams } from "$server/validators/topicParams";
import { authInstructorHandler } from "$server/utils/authInstructorHandler";
import { showSchema, show } from "./show";
import { createSchema, create } from "./create";
import { updateSchema, update } from "./update";
import { destroySchema, destroy } from "./destroy";

export type Params = TopicParams;
export type Props = TopicProps;

export const method: Method = {
  get: showSchema,
  post: createSchema,
  put: updateSchema,
  delete: destroySchema,
};

export const preHandler = authInstructorHandler;

export { show, create, update, destroy };
