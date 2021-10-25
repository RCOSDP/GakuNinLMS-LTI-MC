import { useEffect } from "react";
import type { Content } from "$types/content";
import type { BookSchema } from "$server/models/book";
import { AuthorSchema } from "$server/models/author";
import { useAuthorsAtom } from "$store/authors";
import { fetchUsers } from "$utils/users";
import { updateBookAuthors } from "$utils/bookAuthors";
import { updateTopicAuthors } from "$utils/topicAuthors";

const isBookSchema = (content: Content): content is BookSchema =>
  "sections" in content;

const updateContentAuthors = (content: Content, authors: AuthorSchema[]) =>
  isBookSchema(content)
    ? updateBookAuthors({ id: content.id, authors })
    : updateTopicAuthors({ id: content.id, authors });

function useAuthorsHandler(content?: Content) {
  const { authors: authorsState, updateState, onReset } = useAuthorsAtom();
  useEffect(() => {
    updateState({ authors: content?.authors ?? [] });
  }, [content, updateState]);
  async function handleAuthorsUpdate(authors: AuthorSchema[]) {
    content && updateContentAuthors(content, authors);
    updateState({ authors });
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
        helperText: "すでに著者に含まれています",
      });
    else onReset();
    const authors = [...authorsState, ...additionalAuthors];
    content && updateContentAuthors(content, authors);
    updateState({ authors });
  }

  return {
    handleAuthorsUpdate,
    handleAuthorSubmit,
  };
}

export default useAuthorsHandler;
