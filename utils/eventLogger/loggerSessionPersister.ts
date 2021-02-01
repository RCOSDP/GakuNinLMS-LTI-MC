import { useEffect } from "react";
import { LtiLaunchBody } from "$server/validators/ltiLaunchBody";
import { Session, isInstructor } from "$utils/session";

const key = "loggerSessionPersister";

export function load() {
  if (typeof window === "undefined") return;
  const item = sessionStorage.getItem(key);
  if (item == null) return;
  try {
    return JSON.parse(item) as LtiLaunchBody;
  } catch {
    return;
  }
}

function save(ltiLaunchBody: LtiLaunchBody) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key, JSON.stringify(ltiLaunchBody));
}

function clear() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(key);
}

/**
 * 初回処理。
 * それぞれ学習者のセッション (LtiLaunchBody) を
 * ウィンドウごとに区別する目的でsessionStorageに永続化し
 * あとでlogger.tsで使う。
 * もし教員や管理者ならば永続化せず空にする。
 */
export function useLoggerInit(session: Session | undefined) {
  useEffect(() => {
    if (!session) return;
    if (!session.ltiLaunchBody) return;
    if (isInstructor(session)) clear();
    else save(session.ltiLaunchBody);
  }, [session]);
}
