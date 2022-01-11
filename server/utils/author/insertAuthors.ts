import type { Topic, Book, ContentRole } from "@prisma/client";
import type { AuthorsProps } from "$server/models/authorsProps";
import prisma from "$server/utils/prisma";

/**
 * コンテンツへの新しい作成者の挿入
 * @param roles 役割一覧。roleName は実際の表示名。
 * @param contentType コンテンツの種類
 * @param contentId コンテンツの識別子
 * @param authors 作成者。roleName は実際の表示名。
 */
function insertAuthors(
  roles: Array<ContentRole>,
  contentType: "topic" | "book",
  contentId: Topic["id"] | Book["id"],
  authors: AuthorsProps["authors"]
) {
  return prisma.authorship.createMany({
    data: authors.map((author) => ({
      [`${contentType}Id`]: contentId,
      userId: author.id,
      roleId: roles.find((role) => role.roleName === author.roleName)?.id ?? 1,
    })),
  });
}

export default insertAuthors;
