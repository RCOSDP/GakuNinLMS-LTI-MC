import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import { IndexQuery, indexService } from "$server/services/topic";

export async function topic(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: IndexQuery;
  }>(
    "/topic",
    {
      schema: indexService.method.get,
      preHandler: indexService.preHandler(fastify),
    },
    handler(indexService.get)
  );
}
