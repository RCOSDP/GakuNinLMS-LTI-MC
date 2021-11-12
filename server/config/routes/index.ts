import { FastifyInstance } from "fastify";
import * as lti from "./lti";
import * as user from "./user";
import * as userSettings from "./userSettings";
import * as book from "./book";
import * as books from "./books";
import * as topics from "./topics";
import * as topic from "./topic";
import * as resources from "./resources";
import * as resource from "./resource";
import * as event from "./event";
import * as wowza from "./wowza";
import * as activity from "./activity";
import session from "./session";

const routers = [
  lti,
  user,
  userSettings,
  book,
  books,
  topics,
  topic,
  resources,
  resource,
  event,
  wowza,
  activity,
];

async function routes(fastify: FastifyInstance) {
  for (const router of routers) {
    for (const route of Object.values(router)) {
      await fastify.register(route);
    }
  }

  await fastify.register(session);
}

export default routes;
