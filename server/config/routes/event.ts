import { FastifyInstance } from "fastify";
import { Event } from "$server/models/event";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/event";

export default async function (fastify: FastifyInstance) {
  const { method, create } = service;
  const hooks = makeHooks(fastify, service.hooks);

  fastify.post<{ Body: Event }>(
    "/event",
    { schema: method.post, ...hooks.post },
    handler(create)
  );
}
