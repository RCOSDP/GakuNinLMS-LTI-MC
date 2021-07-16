import { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/topics";

export async function topics(fastify: FastifyInstance) {
  const path = "/topics";
  const { method, index } = service;
  const hooks = makeHooks(fastify, service.hooks);

  fastify.get<{
    Querystring: service.Query;
  }>(path, { schema: method.get, ...hooks.get }, handler(index));
}
