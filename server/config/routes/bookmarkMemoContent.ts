import type { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/bookmarkMemoContent";

const basePath = "/bookmarkMemoContent";

export async function bookmarkMemoContent(fastify: FastifyInstance) {
  const { method, create } = service;
  const hooks = makeHooks(fastify, service.hooks);

  fastify.post<{
    Body: service.Props;
  }>(basePath, { schema: method.post, ...hooks.post }, handler(create));
}
