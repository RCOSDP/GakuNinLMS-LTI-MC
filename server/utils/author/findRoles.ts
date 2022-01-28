import { AuthorSchema } from "$server/models/author";
import prisma from "$server/utils/prisma";

async function findRoles() {
  // NOTE: 役割の表示名への変換
  const roles = (await prisma.contentRole.findMany({})).map((role) => ({
    ...role,
    roleName:
      AuthorSchema._roleNames[
        role.roleName as keyof typeof AuthorSchema._roleNames
      ] ?? role.roleName,
  }));

  return roles;
}

export default findRoles;
