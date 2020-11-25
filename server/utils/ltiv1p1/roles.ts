import roles from "~server/config/roles";
import LtiLaunchBody from "~server/validators/ltiLaunchBody";

/**
 * ロールが管理者か否か
 * @param ltiLaunchBody LTI v1.1 起動時リクエストボディ
 * @return 管理者の場合 true、それ以外の場合 false
 */
export function isAdministrator(ltiLaunchBody: LtiLaunchBody) {
  return hasRole(ltiLaunchBody.roles, roles.administrator);
}

/**
 * ロールが教員か否か
 * @param ltiLaunchBody LTI v1.1 起動時リクエストボディ
 * @return 教員の場合 true、それ以外の場合 false
 */
export function isInstructor(ltiLaunchBody: LtiLaunchBody) {
  return hasRole(ltiLaunchBody.roles, roles.instructor);
}

/**
 * 特定のロールを持っているか否か
 * @param roles 持っているロール一覧。 `,` 区切り。
 * @param roleToFind 対象のロール
 * @return 対象のロールを持っている場合 true、それ以外の場合 false
 */
function hasRole(roles: string, roleToFind: readonly string[]) {
  return roles.split(",").some((role) => roleToFind.includes(role));
}
