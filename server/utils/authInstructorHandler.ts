import { FastifyInstance } from "fastify";
import { isInstructor } from "$server/utils/session";

/** 教員を認可するための preHandler */
export function authInstructorHandler(fastify: FastifyInstance) {
  return fastify.auth([
    async ({ session }) => {
      const authorized = isInstructor(session);
      if (!authorized) throw new Error("unauthorized");
    },
  ]);
}
