import { ResourceParams } from "$server/validators/resourceParams";
import { VideoTrackParams } from "$server/validators/videoTrackParams";
import { authInstructorHandler } from "$server/utils/authInstructorHandler";
import { showSchema, show } from "./show";
import { createSchema, create } from "./create";
import { destroySchema, destroy } from "./destroy";

export type Params = VideoTrackParams;
export type CreateParams = ResourceParams;
export type { CreateBody } from "./create";

export const method = {
  get: showSchema,
  post: createSchema,
  delete: destroySchema,
};

export const preHandler = authInstructorHandler;

export { show, create, destroy };
