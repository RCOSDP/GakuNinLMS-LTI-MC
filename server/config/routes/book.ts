import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import * as service from "$server/services/book";

export async function book(fastify: FastifyInstance) {
  const basePath = "/book";
  const pathWithParams = `${basePath}/:book_id`;
  const { method, show, create, update, destroy } = service;
  const preHandler = service.preHandler(fastify);

  fastify.get<{
    Params: service.Params;
  }>(pathWithParams, { schema: method.get }, handler(show));

  fastify.post<{
    Body: service.Props;
  }>(basePath, { schema: method.post, preHandler }, handler(create));

  fastify.put<{
    Params: service.Params;
    Body: service.Props;
  }>(pathWithParams, { schema: method.put, preHandler }, handler(update));

  fastify.delete<{
    Params: service.Params;
  }>(pathWithParams, { schema: method.delete, preHandler }, handler(destroy));
}
