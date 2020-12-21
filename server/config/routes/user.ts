import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import * as service from "$server/services/user/books";

export async function books(fastify: FastifyInstance) {
  fastify.get<{ Querystring: service.Query; Params: service.Params }>(
    "/user/:user_id/books",
    { schema: service.method.get, preHandler: service.preHandler(fastify) },
    handler(service.get)
  );
}
