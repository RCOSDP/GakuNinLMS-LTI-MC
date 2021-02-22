import type { FastifyRequest } from "fastify";
import { isInstructor } from "$server/utils/session";

async function authInstructor(req: FastifyRequest) {
  if (!isInstructor(req.session)) throw new Error("not instructor");
}

export default authInstructor;
