import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import { method, Params, service } from "$server/services/book";

export async function book(fastify: FastifyInstance) {
  fastify.get<{
    Params: Params;
  }>("/:book_id", { schema: method.get }, handler(service.get));
}
