import roleUrls from "$server/config/roleUrls";
import type { LtiRolesSchema } from "$server/models/ltiRoles";

/**
 * ロールが管理者か否か
 * @param ltiRoles LTI v1.3 Roles Claim
 * @return 管理者の場合 true、それ以外の場合 false
 */
export function isAdministrator(ltiRoles: LtiRolesSchema) {
  return hasRole(ltiRoles, roleUrls.administrator);
}

/**
 * ロールが教員・管理者か否か
 * @param ltiRoles LTI v1.3 Roles Claim
 * @return 教員または管理者の場合 true、それ以外の場合 false
 */
export function isInstructor(ltiRoles: LtiRolesSchema) {
  return hasRole(ltiRoles, [...roleUrls.instructor, ...roleUrls.administrator]);
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
