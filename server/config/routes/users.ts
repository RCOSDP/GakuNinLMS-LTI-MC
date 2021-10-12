import { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/users";

export async function users(fastify: FastifyInstance) {
  const path = "/users/:email";
  const { method, index } = service;
  const hooks = makeHooks(fastify, service.hooks);

  fastify.get<{
    Params: service.Params;
  }>(path, { schema: method.get, ...hooks.get }, handler(index));
}
