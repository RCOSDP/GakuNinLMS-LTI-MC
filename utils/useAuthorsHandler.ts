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
  const { authors: authorsState, updateAuthors } = useAuthorsAtom();
  useEffect(() => {
    updateAuthors(content?.authors ?? []);
  }, [content, updateAuthors]);
  async function handleAuthorsUpdate(authors: AuthorSchema[]) {
    content && updateContentAuthors(content, authors);
    updateAuthors(authors);
  }
  async function handleAuthorSubmit({ email }: Pick<AuthorSchema, "email">) {
    if (!email) return;
    const users = await fetchUsers(email);
    const authors = [
      ...authorsState,
      ...users
        .filter((user) => !authorsState.some((author) => author.id === user.id))
        .map((user) => ({
          ...user,
          roleName: AuthorSchema._roleNames.author,
        })),
    ];
    content && updateContentAuthors(content, authors);
    updateAuthors(authors);
  }

  return {
    handleAuthorsUpdate,
    handleAuthorSubmit,
  };
}

export default useAuthorsHandler;
