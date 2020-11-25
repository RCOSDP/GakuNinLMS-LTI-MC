import { FastifyRequest, FastifyReply } from "fastify";
import Controller from "~server/types/controller";

const handler = <K extends keyof Controller>(
  method: Required<Controller>[K]
) => async (request: FastifyRequest, reply: FastifyReply) => {
  const { status, headers, body } = await method(request);
  if (headers != null) reply.headers(headers);
  reply.code(status).send(body);
};

export default handler;
