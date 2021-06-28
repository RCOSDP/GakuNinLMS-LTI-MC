import type { SessionSchema } from "$server/models/session";

declare module "fastify" {
  interface Session {
    oauthClient: SessionSchema["oauthClient"];
    ltiVersion: SessionSchema["ltiVersion"];
    ltiUser: SessionSchema["ltiUser"];
    ltiRoles: SessionSchema["ltiRoles"];
    ltiResourceLinkRequest: SessionSchema["ltiResourceLinkRequest"];
    ltiContext: SessionSchema["ltiContext"];
    ltiLaunchPresentation: SessionSchema["ltiLaunchPresentation"];
    ltiResourceLink: SessionSchema["ltiResourceLink"];
    user: SessionSchema["user"];
  }
}
