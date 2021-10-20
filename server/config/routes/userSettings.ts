import { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/userSettings";

const basePath = "/userSettings";

export default async function (fastify: FastifyInstance) {
  const hooks = makeHooks(fastify, service.Hooks);

  fastify.put<{
    Body: service.Prop;
  }>(
    basePath,
    { schema: service.Schema.put, ...hooks.put },
    handler(service.update)
  );
}
