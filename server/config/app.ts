import { FastifyInstance } from "fastify";
import swagger from "fastify-swagger";
import helmet from "fastify-helmet";
import cors from "fastify-cors";
import session from "fastify-session";
import cookie from "fastify-cookie";
import auth from "fastify-auth";
import formbody from "fastify-formbody";
import pkg from "$server/package.json";
import routes from "./routes";

export type Options = {
  basePath: string;
  allowOrigin: string[];
  sessionSecret: string;
  sessionStore: session.SessionStore;
};

async function app(fastify: FastifyInstance, options: Options) {
  const { basePath, allowOrigin, sessionSecret, sessionStore } = options;

  await fastify.register(swagger, {
    routePrefix: `${basePath}/swagger`,
    swagger: {
      info: {
        title: pkg.name,
        version: pkg.version,
      },
    },
    exposeRoute: true,
  });

  await fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        scriptSrc: ["'self'"].concat(fastify.swaggerCSP.script),
        styleSrc: ["'self'"].concat(fastify.swaggerCSP.style),
      },
    },
  });

  await Promise.all([
    fastify.register(cors, {
      origin: allowOrigin,
      credentials: true,
    }),
    fastify.register(cookie),
    fastify.register(session, {
      secret: sessionSecret,
      store: sessionStore,
      cookie: { secure: "auto" },
    }),
    fastify.register(auth),
    fastify.register(formbody),
  ]);

  await fastify.register(routes, { prefix: basePath });
}

export default app;
