import type { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/wowza";

export async function wowza(fastify: FastifyInstance) {
  const hooks = makeHooks(fastify, service.hooks);

  fastify.get<{ Params: service.Params; Querystring: service.Query }>(
    "/wowza/*",
    { schema: service.method.get, ...hooks.get },
    handler(service.show)
  );

  fastify.post(
    "/wowza",
    { schema: service.method.post, ...hooks.post },
    handler(service.create)
  );
}
