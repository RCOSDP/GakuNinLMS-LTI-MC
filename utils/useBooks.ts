import { useEffect } from "react";
import { useSearchAtom } from "$store/search";
import useContents from "./useContents";

function useBooks() {
  const { query, updateQuery } = useSearchAtom();
  const props = useContents(query);

  useEffect(() => {
    updateQuery({
      type: "book",
      q: "",
      filter: "self",
      sort: "updated",
      perPage: 30,
      page: 0,
    });
  }, [updateQuery]);

  return props;
}

export default useBooks;
