import { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/wowza";

export default async function (fastify: FastifyInstance) {
  const path = "/wowza/*";
  const { method, show } = service;
  const hooks = makeHooks(fastify, service.hooks);

  fastify.get<{ Params: service.Params }>(
    path,
    { schema: method.get, ...hooks.get },
    handler(show)
  );
}
