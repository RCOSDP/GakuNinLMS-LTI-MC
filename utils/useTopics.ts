import { useEffect } from "react";
import { useSearchAtom } from "$store/search";
import useContents from "./useContents";

function useTopics() {
  const { query, updateQuery } = useSearchAtom();
  const props = useContents(query);

  useEffect(() => {
    updateQuery((query) => ({ ...query, type: "topic" }));
  }, [updateQuery]);

  return props;
}

export default useTopics;
