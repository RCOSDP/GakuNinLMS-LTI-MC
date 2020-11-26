import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import service, { method, Query, Params } from "$server/services/user/books";

export async function books(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: Query;
    Params: Params;
  }>(
    "/:user_id/books",
    { schema: method.get, preHandler: service.preHandler(fastify) },
    handler(service.get)
  );
}
