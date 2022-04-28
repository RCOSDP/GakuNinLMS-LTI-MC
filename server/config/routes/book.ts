import type { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/book";
import * as activityService from "$server/services/book/activity";
import * as authorsService from "$server/services/book/authors";
import * as showPublicService from "$server/services/book/public";

const basePath = "/book";
const pathWithParams = `${basePath}/:book_id`;

export async function book(fastify: FastifyInstance) {
  const { method, show, create, update, destroy } = service;
  const hooks = makeHooks(fastify, service.hooks);

  fastify.get<{
    Params: service.Params;
  }>(pathWithParams, { schema: method.get, ...hooks.get }, handler(show));

  fastify.post<{
    Body: service.Props;
  }>(basePath, { schema: method.post, ...hooks.post }, handler(create));

  fastify.put<{
    Params: service.Params;
    Body: service.Props;
  }>(pathWithParams, { schema: method.put, ...hooks.put }, handler(update));

  fastify.delete<{
    Params: service.Params;
  }>(
    pathWithParams,
    { schema: method.delete, ...hooks.delete },
    handler(destroy)
  );
}

export async function bookActivity(fastify: FastifyInstance) {
  const path = `${pathWithParams}/activity`;
  const { method, index } = activityService;
  const hooks = makeHooks(fastify, activityService.hooks);

  fastify.get<{
    Params: activityService.Params;
    Querystring: activityService.Query;
  }>(path, { schema: method.get, ...hooks.get }, handler(index));
}
export async function bookAuthors(fastify: FastifyInstance) {
  const path = `${pathWithParams}/authors`;
  const { method, update } = authorsService;
  const hooks = makeHooks(fastify, authorsService.hooks);

  fastify.put<{
    Params: authorsService.Params;
    Body: authorsService.Props;
  }>(path, { schema: method.put, ...hooks.put }, handler(update));
}

export async function bookPublic(fastify: FastifyInstance) {
  const path = `${basePath}/public/:token`;
  const { schema, hook, method } = showPublicService;
  const hooks = makeHooks(fastify, { get: hook });

  fastify.get<{
    Params: showPublicService.Params;
    Headers: showPublicService.Headers;
  }>(path, { schema, ...hooks.get }, handler(method));
}
