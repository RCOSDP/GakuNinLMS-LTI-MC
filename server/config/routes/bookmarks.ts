import type { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/bookmarks";
export async function bookmarks(fastify: FastifyInstance) {
  const { method, index } = service;
  const hooks = makeHooks(fastify, service.hooks);

  fastify.get<{ Params: service.Params }>(
    "/bookmarks",
    { schema: method.get, ...hooks.get },
    handler(index)
  );
}
