import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import { IndexQuery, indexService } from "$server/services/topics";

export async function topics(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: IndexQuery;
  }>(
    "/topics",
    {
      schema: indexService.method.get,
      preHandler: indexService.preHandler(fastify),
    },
    handler(indexService.get)
  );
}
