import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import service, { method } from "$server/services/session";

export default async function (fastify: FastifyInstance) {
  fastify.get("/session", { schema: method.get }, handler(service.get));
}
