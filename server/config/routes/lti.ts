import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import service, { method } from "$server/services/ltiLaunch";

export async function launch(fastify: FastifyInstance) {
  fastify.post(
    "/launch",
    {
      schema: method.post,
      preValidation: service.preValidation(),
      preHandler: service.preHandler(fastify),
    },
    handler(service.post)
  );
}
