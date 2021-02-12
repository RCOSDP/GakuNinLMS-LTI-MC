import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import * as service from "$server/services/topic";
import * as activityService from "$server/services/topic/activity";

const basePath = "/topic";
const pathWithParams = `${basePath}/:topic_id`;

export async function topic(fastify: FastifyInstance) {
  const { method, show, create, update, destroy } = service;
  const preHandler = service.preHandler(fastify);

  fastify.get<{
    Params: service.Params;
  }>(pathWithParams, { schema: method.get }, handler(show));

  fastify.post<{
    Body: service.Props;
  }>(basePath, { schema: method.post, preHandler }, handler(create));

  fastify.put<{
    Params: service.Params;
    Body: service.Props;
  }>(pathWithParams, { schema: method.put, preHandler }, handler(update));

  fastify.delete<{
    Params: service.Params;
  }>(pathWithParams, { schema: method.delete, preHandler }, handler(destroy));
}

export async function topicActivity(fastify: FastifyInstance) {
  const { method, update } = activityService;
  const path = `${pathWithParams}/activity`;

  fastify.put<{
    Params: activityService.Params;
    Body: activityService.Props;
  }>(path, { schema: method.put }, handler(update));
}
