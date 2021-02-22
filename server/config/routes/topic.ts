import { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/topic";
import * as activityService from "$server/services/topic/activity";

const basePath = "/topic";
const pathWithParams = `${basePath}/:topic_id`;

export async function topic(fastify: FastifyInstance) {
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

export async function topicActivity(fastify: FastifyInstance) {
  const path = `${pathWithParams}/activity`;
  const { method, update } = activityService;
  const hooks = makeHooks(fastify, activityService.hooks);

  fastify.put<{
    Params: activityService.Params;
    Body: activityService.Props;
  }>(path, { schema: method.put, ...hooks.put }, handler(update));
}
