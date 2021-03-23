import type { UserSchema } from "$server/models/user";
import type { LtiResourceLinkProps } from "$server/models/ltiResourceLink";

export type AnalysisDetail = {
  user: UserSchema;
  ltiResource: Omit<LtiResourceLinkProps, "bookId" | "authorId">;
  data: {
    name: string;
    status: string;
  }[];
};
