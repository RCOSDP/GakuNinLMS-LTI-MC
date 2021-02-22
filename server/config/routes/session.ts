import { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/session";

export default async function (fastify: FastifyInstance) {
  const { method, show } = service;
  const hooks = makeHooks(fastify, service.hooks);

  fastify.get("/session", { schema: method.get, ...hooks.get }, handler(show));
}
