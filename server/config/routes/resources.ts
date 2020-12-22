import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import * as service from "$server/services/resources";

export async function resources(fastify: FastifyInstance) {
  const { method, index, preHandler } = service;
  fastify.get<{
    Querystring: service.Query;
  }>(
    "/resources",
    { schema: method.get, preHandler: preHandler(fastify) },
    handler(index)
  );
}
