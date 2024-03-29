import type { UserSchema } from "$server/models/user";

/** 著者フィルター */
export type AuthorFilter =
  | {
      /** 著者に自分が含まれるもの */
      type: "self";
      /** 利用者 */
      by: UserSchema["id"];
    }
  | {
      /** 著者に自分が含まれないもの */
      type: "other";
      /** 利用者 */
      by: UserSchema["id"];
      /** 利用者が管理者であるか否か (管理者: true、それ以外: false) */
      admin: boolean;
    }
  | {
      /** すべて */
      type: "all";
      /** 利用者 */
      by: UserSchema["id"];
      /** 利用者が管理者であるか否か (管理者: true、それ以外: false) */
      admin: boolean;
    };

export type AuthorFilterType = AuthorFilter["type"];
