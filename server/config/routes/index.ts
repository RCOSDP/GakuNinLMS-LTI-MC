import { FastifyInstance } from "fastify";
import * as lti from "./lti";
import * as user from "./user";
import session from "./session";

const resources = { lti, user };

async function routes(fastify: FastifyInstance) {
  for (const [prefix, router] of Object.entries(resources)) {
    for (const route of Object.values(router)) {
      await fastify.register(route, { prefix });
    }
  }

  await fastify.register(session);
}

export default routes;
