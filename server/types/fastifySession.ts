import type { User } from "@prisma/client";
import type { LtiLaunchBody } from "$server/validators/ltiLaunchBody";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";

declare module "fastify" {
  interface Session {
    ltiLaunchBody?: LtiLaunchBody;
    ltiResourceLink?: null | LtiResourceLinkSchema;
    user?: User;
  }
}
