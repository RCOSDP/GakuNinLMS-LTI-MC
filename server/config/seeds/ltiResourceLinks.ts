import { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";

const ltiResourceLinks: readonly Omit<
  LtiResourceLinkSchema,
  "consumerId" | "bookId" | "authorId"
>[] = [
  {
    id: "1",
    contextId: "2",
    title: "リンク",
    contextTitle: "コース",
    contextLabel: "C2",
  },
];

export default ltiResourceLinks;
