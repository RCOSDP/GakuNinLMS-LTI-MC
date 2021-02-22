import type { SessionSchema } from "$server/models/session";

declare module "fastify" {
  interface Session {
    ltiLaunchBody: SessionSchema["ltiLaunchBody"];
    ltiResourceLink: SessionSchema["ltiResourceLink"];
    user: SessionSchema["user"];
  }
}
