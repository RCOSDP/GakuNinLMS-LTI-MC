import { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as ltiLaunchService from "$server/services/ltiLaunch";
import * as ltiResourceLinkService from "$server/services/ltiResourceLink";

export async function launch(fastify: FastifyInstance) {
  const path = "/lti/launch";
  const { method, post } = ltiLaunchService;
  const hooks = makeHooks(fastify, ltiLaunchService.hooks);

  fastify.post(path, { schema: method.post, ...hooks.post }, handler(post));
}

export async function resourceLink(fastify: FastifyInstance) {
  const path = "/lti/:lti_consumer_id/resource_link/:lti_resource_link_id";
  const { method, show, update, destroy } = ltiResourceLinkService;
  const hooks = makeHooks(fastify, ltiResourceLinkService.hooks);

  fastify.get<{
    Params: ltiResourceLinkService.Params;
  }>(path, { schema: method.get, ...hooks.get }, handler(show));

  fastify.put<{
    Params: ltiResourceLinkService.Params;
    Body: ltiResourceLinkService.Props;
  }>(path, { schema: method.put, ...hooks.put }, handler(update));

  fastify.delete<{
    Params: ltiResourceLinkService.Params;
  }>(path, { schema: method.delete, ...hooks.delete }, handler(destroy));
}
