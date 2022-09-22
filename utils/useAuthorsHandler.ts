import { useMemo, useEffect } from "react";
import type { ContentSchema } from "$server/models/content";
import { AuthorSchema } from "$server/models/author";
import { useAuthorsAtom } from "$store/authors";
import { useSessionAtom } from "$store/session";
import { fetchUsers } from "$utils/users";
import { updateBookAuthors } from "$utils/bookAuthors";
import { updateTopicAuthors } from "$utils/topicAuthors";

const updateContentAuthors = (
  content: ContentSchema,
  authors: AuthorSchema[]
) =>
  content.type === "book"
    ? updateBookAuthors({ id: content.id, authors })
    : updateTopicAuthors({ id: content.id, authors });

function useAuthorsHandler(content?: ContentSchema) {
  const { session } = useSessionAtom();
  const { authors: authorsState, updateState, onReset } = useAuthorsAtom();
  const initialAuthors = useMemo(() => {
    if (!session) return [];
    // NOTE: update book/topic
    if (content) return content.authors;

    // NOTE: create book/topic
    return [
      {
        ...session.user,
        roleName: AuthorSchema._roleNames.author,
      },
    ];
  }, [session, content]);
  useEffect(() => {
    updateState({ authors: initialAuthors });
  }, [initialAuthors, updateState]);
  async function handleAuthorsUpdate(authors: AuthorSchema[]) {
    if (content) {
      const res = await updateContentAuthors(content, authors);
      updateState({ authors: res });
    } else {
      updateState({ authors });
    }
  }
  async function handleAuthorSubmit({ email }: Pick<AuthorSchema, "email">) {
    if (!email) return;
    const users = await fetchUsers(email);
    const additionalAuthors = users
      .filter((user) => !authorsState.some((author) => author.id === user.id))
      .map((user) => ({
        ...user,
        roleName: AuthorSchema._roleNames.author,
      }));
    if (users.length === 0)
      updateState({
        error: true,
        helperText:
          "該当するメールアドレスが存在しないか、無効なメールアドレスです",
      });
    else if (additionalAuthors.length === 0)
      updateState({
        error: false,
        helperText: "すでに作成者に含まれています",
      });
    else onReset();
    const authors = [...authorsState, ...additionalAuthors];
    await handleAuthorsUpdate(authors);
  }

  return {
    handleAuthorsUpdate,
    handleAuthorSubmit,
  };
}

export default useAuthorsHandler;
