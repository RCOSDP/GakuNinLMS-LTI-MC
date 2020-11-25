import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import ltiLaunch, {
  method as ltiLaunchMethod,
} from "$server/services/ltiLaunch";
import session, { method as sessionMethod } from "$server/services/session";

export type Options = { basePath: string };

async function routes(fastify: FastifyInstance, options: Options) {
  const { basePath } = options;

  fastify.post(
    `${basePath}/lti/launch`,
    {
      schema: ltiLaunchMethod.post,
      preValidation: ltiLaunch.preValidation(),
      preHandler: ltiLaunch.preHandler(fastify),
    },
    handler(ltiLaunch.post)
  );

  fastify.get(
    `${basePath}/session`,
    {
      schema: sessionMethod.get,
    },
    handler(session.get)
  );
}

export default routes;
