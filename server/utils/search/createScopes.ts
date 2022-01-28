import type { Prisma } from "@prisma/client";
import type { AuthorFilter } from "$server/models/authorFilter";

/** 著者フィルターの表示範囲の Prisma クエリーの生成 */
function createScopes(
  filter: AuthorFilter
): Array<Prisma.BookWhereInput & Prisma.TopicWhereInput> {
  const sharedScope = { shared: true };
  const selfScope = { authors: { some: { userId: filter.by } } };
  const defaultScopes = {
    all: [{ OR: [sharedScope, selfScope] }],
    self: [selfScope],
    other: [sharedScope, { NOT: selfScope }],
  };
  const adminScopes = {
    all: [],
    self: [selfScope],
    other: [{ NOT: selfScope }],
  };

  return "admin" in filter && filter.admin
    ? adminScopes[filter.type]
    : defaultScopes[filter.type];
}

export default createScopes;
