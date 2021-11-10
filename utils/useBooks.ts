import { useEffect } from "react";
import { useSearchAtom } from "$store/search";
import useContents from "./useContents";

function useBooks() {
  const { query, updateQuery } = useSearchAtom();
  const props = useContents(query);

  useEffect(() => {
    updateQuery((query) => ({ ...query, type: "book" }));
  }, [updateQuery]);

  return props;
}

export default useBooks;
