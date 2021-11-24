import { useEffect } from "react";
import { useSearchAtom } from "$store/search";
import useContents from "./useContents";

function useBooks() {
  const { query, setType } = useSearchAtom();
  const props = useContents(query);

  useEffect(() => {
    setType("book");
  }, [setType]);

  return props;
}

export default useBooks;
