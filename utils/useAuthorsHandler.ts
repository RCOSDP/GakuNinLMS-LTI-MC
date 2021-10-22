import { useEffect } from "react";
import type { Content } from "$types/content";
import { AuthorSchema } from "$server/models/author";
import type { AuthorProps } from "$server/models/author";
import { useAuthorsAtom } from "$store/authors";
import { fetchUsers } from "$utils/users";

function useAuthorsHandler(content?: Content) {
  const { authors, updateAuthors } = useAuthorsAtom();
  useEffect(() => {
    updateAuthors(content?.authors ?? []);
  }, [content, updateAuthors]);
  async function handleAuthorSubmit({ email }: AuthorProps) {
    if (!email) return;
    const users = await fetchUsers(email);
    updateAuthors([
      ...authors,
      ...users
        .filter((user) => !authors.some((author) => author.id === user.id))
        .map((user) => ({
          ...user,
          roleName: AuthorSchema._roleNames.author,
        })),
    ]);
  }

  return {
    handleAuthorsUpdate: updateAuthors,
    handleAuthorSubmit,
  };
}

export default useAuthorsHandler;
