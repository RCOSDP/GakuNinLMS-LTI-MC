import { useEffect } from "react";
import { useSearchAtom } from "$store/search";
import useContents from "./useContents";

function useTopics() {
  const { query, setType } = useSearchAtom();
  const props = useContents(query);

  useEffect(() => {
    setType("topic");
  }, [setType]);

  return props;
}

export default useTopics;
