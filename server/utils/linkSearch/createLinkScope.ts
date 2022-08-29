import type { AuthorFilter } from "$server/models/authorFilter";
import createScopes from "$server/utils/search/createScopes";

function createLinkScope(
  filter: AuthorFilter,
  course: { oauthClientId: string; ltiContextId: string }
) {
  if (filter.type === "all" && filter.admin) return {};
  return {
    OR: [
      {
        consumerId: course.oauthClientId,
        contextId: course.ltiContextId,
      },
      {
        creatorId: filter.by,
        book: { AND: createScopes(filter) },
      },
    ],
  };
}

export default createLinkScope;
