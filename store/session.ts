import { atom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import type { TopicSchema } from "$server/models/topic";
import type { BookSchema } from "$server/models/book";
import type { SessionSchema } from "$server/models/session";

type SessionWithState = {
  session: SessionSchema | undefined;
  isAdministrator: boolean;
  isInstructor: boolean;
  isTopicEditable(topic: Pick<TopicSchema, "creator">): boolean;
  isBookEditable(book: Pick<BookSchema, "author">): boolean;
  error: boolean;
};

const sessionAtom = atom<SessionWithState>({
  session: undefined,
  isAdministrator: false,
  isInstructor: false,
  isTopicEditable: () => false,
  isBookEditable: () => false,
  error: false,
});

export function useSessionAtom() {
  return useAtomValue(sessionAtom);
}

export function useUpdateSessionAtom() {
  return useUpdateAtom(sessionAtom);
}

export function useLmsUrl() {
  const { session } = useSessionAtom();
  return session?.ltiLaunchBody.launch_presentation_return_url;
}
