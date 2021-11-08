import type { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/search";

export async function users(fastify: FastifyInstance) {
  const path = "/search";
  const { method, index } = service;
  const hooks = makeHooks(fastify, service.hooks);

  fastify.get<{ Querystring: service.Query }>(
    path,
    { schema: method.get, ...hooks.get },
    handler(index)
  );
}
