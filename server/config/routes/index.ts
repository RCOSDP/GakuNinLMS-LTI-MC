import { FastifyInstance } from "fastify";
import * as lti from "./lti";
import * as user from "./user";
import * as book from "./book";
import * as topics from "./topics";
import * as topic from "./topic";
import session from "./session";

const resources = [lti, user, book, topics, topic];

async function routes(fastify: FastifyInstance) {
  for (const router of resources) {
    for (const route of Object.values(router)) {
      await fastify.register(route);
    }
  }

  await fastify.register(session);
}

export default routes;
