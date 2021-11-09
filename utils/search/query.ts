import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";

/** @deprecated */
export type Query = {
  keywords: string[];
  ltiResourceLinks: Array<
    Pick<LtiResourceLinkSchema, "consumerId" | "contextId">
  >;
};
