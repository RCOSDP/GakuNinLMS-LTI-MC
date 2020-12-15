import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import { method, Params, service } from "$server/services/topic";

export async function topic(fastify: FastifyInstance) {
  fastify.get<{
    Params: Params;
  }>("/topic/:topic_id", { schema: method.get }, handler(service.get));
}
