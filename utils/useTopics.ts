import { useEffect } from "react";
import { useSearchAtom } from "$store/search";
import useContents from "./useContents";

function useTopics() {
  const { query, updateQuery } = useSearchAtom();
  const props = useContents(query);

  useEffect(() => {
    updateQuery({
      type: "topic",
      q: "",
      filter: "self",
      sort: "updated",
      perPage: 30,
      page: 0,
    });
  }, [updateQuery]);

  return props;
}

export default useTopics;
