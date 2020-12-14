import fastify from "fastify";
import {
  PORT,
  BASE_PATH,
  SESSION_SECRET,
  FRONTEND_ORIGIN,
} from "$server/utils/env";
import { sessionStore } from "$server/utils/prisma";
import app, { Options } from "$server/config/app";

const isDev = process.env.NODE_ENV !== "production";

fastify({ logger: isDev })
  .register(app, {
    basePath: BASE_PATH,
    allowOrigin: [FRONTEND_ORIGIN],
    sessionSecret: SESSION_SECRET,
    sessionStore: sessionStore as Options["sessionStore"],
  })
  .listen(PORT, "::");
