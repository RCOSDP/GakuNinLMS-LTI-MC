import type { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as booksService from "$server/services/user/books";
import * as topicsService from "$server/services/user/topics";

const basePath = "/user/:user_id";

export async function books(fastify: FastifyInstance) {
  const path = `${basePath}/books`;
  const { method, index } = booksService;
  const hooks = makeHooks(fastify, booksService.hooks);

  fastify.get<{
    Querystring: booksService.Query;
    Params: booksService.Params;
  }>(path, { schema: method.get, ...hooks.get }, handler(index));
}

export async function topics(fastify: FastifyInstance) {
  const path = `${basePath}/topics`;
  const { method, index } = topicsService;
  const hooks = makeHooks(fastify, topicsService.hooks);

  fastify.get<{
    Querystring: topicsService.Query;
    Params: topicsService.Params;
  }>(path, { schema: method.get, ...hooks.get }, handler(index));
}
