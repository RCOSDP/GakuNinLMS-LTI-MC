import { AuthorSchema } from "$server/models/author";
import type { AuthorsProps } from "$server/validators/authorsProps";
import type { Topic, Book } from "@prisma/client";
import prisma from "$server/utils/prisma";
import type { Authorship } from "./authorToAuthorSchema";
import { authorArg, authorToAuthorSchema } from "./authorToAuthorSchema";

export function authorsUpdater(
  contentType: "topic" | "book",
  content: Pick<Topic | Book, "id"> & { authors: Array<Authorship> }
): {
  authors: Array<AuthorSchema>;
  updateAuthors(authors: AuthorsProps): Promise<Array<AuthorSchema>>;
} {
  const authors = content.authors.map(authorToAuthorSchema);
  async function updateAuthors({ authors }: AuthorsProps) {
    const roles = (await prisma.contentRole.findMany({})).map((role) => ({
      ...role,
      roleName:
        AuthorSchema._roleNames[
          role.roleName as keyof typeof AuthorSchema._roleNames
        ] ?? role.roleName,
    }));

    await prisma.$transaction([
      prisma.authorship.deleteMany({
        where: { [`${contentType}Id`]: content.id },
      }),
      prisma.authorship.createMany({
        data: authors.map((author) => ({
          [`${contentType}Id`]: content.id,
          userId: author.id,
          roleId:
            roles.find((role) => role.roleName === author.roleName)?.id ?? 1,
        })),
      }),
    ]);

    const created = await prisma.authorship.findMany({
      ...authorArg,
      where: { [contentType]: { id: content.id } },
    });

    return created.map(authorToAuthorSchema);
  }

  return {
    authors,
    updateAuthors,
  };
}
