import type { FastifyRequest } from "fastify";

async function authUser(req: FastifyRequest) {
  if (!req.session.user) throw new Error("user authorization required");
}

export default authUser;
