import { atom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import type { SessionSchema } from "$server/models/session";
import type { ContentAuthors, IsContentEditable } from "$types/content";
import {
  isAdministrator as isAdministratorSession,
  isInstructor as isInstructorSession,
} from "$utils/session";
import contentBy from "$utils/contentBy";

type SessionWithState = {
  session: SessionSchema | undefined;
  isAdministrator: boolean;
  isInstructor: boolean;
  isContentEditable: IsContentEditable;
  error: boolean;
};

const sessionAtom = atom<SessionWithState>({
  session: undefined,
  isAdministrator: false,
  isInstructor: false,
  isContentEditable: () => false,
  error: false,
});

const updateSessionAtom = atom<
  null,
  { session: SessionSchema | undefined; error: boolean }
>(null, (get, set, { session, error }) => {
  const isAdministrator = Boolean(session && isAdministratorSession(session));
  const isInstructor = Boolean(session && isInstructorSession(session));
  const sessionWithState = {
    session,
    isAdministrator,
    isInstructor,
    isContentEditable(content: ContentAuthors) {
      return isAdministrator || contentBy(content, session?.user);
    },
    error,
  };
  set(sessionAtom, { ...get(sessionAtom), ...sessionWithState });
});

export function useSessionAtom() {
  return useAtomValue(sessionAtom);
}

export function useUpdateSessionAtom() {
  return [useAtomValue(sessionAtom), useUpdateAtom(updateSessionAtom)] as const;
}

export function useLmsUrl() {
  const { session } = useSessionAtom();
  return session?.ltiLaunchPresentation?.returnUrl;
}
