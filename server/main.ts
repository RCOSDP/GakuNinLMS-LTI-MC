import fastify from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";
import {
  PORT,
  API_BASE_PATH,
  SESSION_SECRET,
  FRONTEND_ORIGIN,
  FRONTEND_PATH,
  HTTPS_CERT,
  HTTPS_KEY,
} from "$server/utils/env";
import { sessionStore } from "$server/utils/prisma";
import app, { Options } from "$server/config/app";

const isDev = process.env.NODE_ENV !== "production";
const options = { logger: isDev };

if (HTTPS_CERT && HTTPS_KEY) {
  Object.assign(options, { https: { cert: HTTPS_CERT, key: HTTPS_KEY } });
}

fastify(options)
  .register(fastifyStatic, {
    root: path.resolve(__dirname, "static"),
    prefix: FRONTEND_PATH,
    extensions: ["html"],
  })
  .register(app, {
    basePath: API_BASE_PATH,
    allowOrigin: [FRONTEND_ORIGIN],
    sessionSecret: SESSION_SECRET,
    sessionStore: sessionStore as Options["sessionStore"],
  })
  .listen(PORT, "::");
