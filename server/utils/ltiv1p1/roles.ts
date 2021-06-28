import roleUrns from "$server/config/roles";
import { LtiRolesSchema } from "$server/models/ltiRoles";

/** LIS Context Role 名前空間の接頭辞 */
const lisContextRolePrefix = "urn:lti:role:ims/lis/";

/** LIS Context Role 省略名を含める */
function makeRole(role: string) {
  return role.startsWith(lisContextRolePrefix)
    ? [role, role.slice(lisContextRolePrefix.length)]
    : [role];
}

/** LIS Context Role の名前空間のものを含めたロール */
const roles = {
  administrator: roleUrns.administrator.flatMap(makeRole),
  instructor: roleUrns.instructor.flatMap(makeRole),
} as const;

/**
 * ロールが管理者か否か
 * @param ltiRoles LTI v1.1 Roles
 * @return 管理者の場合 true、それ以外の場合 false
 */
export function isAdministrator(ltiRoles: LtiRolesSchema) {
  return hasRole(ltiRoles, roles.administrator);
}

/**
 * ロールが教員・管理者か否か
 * @param ltiRoles LTI v1.1 Roles
 * @return 教員または管理者の場合 true、それ以外の場合 false
 */
export function isInstructor(ltiRoles: LtiRolesSchema) {
  return hasRole(ltiRoles, [...roles.instructor, ...roles.administrator]);
}

/**
 * 特定のロールを持っているか否か
 * @param ltiRoles 持っているロール一覧
 * @param roleToFind 対象のロール
 * @return 対象のロールを持っている場合 true、それ以外の場合 false
 */
function hasRole(ltiRoles: LtiRolesSchema, roleToFind: readonly string[]) {
  return ltiRoles.some((role) => roleToFind.includes(role));
}
