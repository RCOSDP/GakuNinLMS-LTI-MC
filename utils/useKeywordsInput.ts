import { useState } from "react";
import type { KeywordPropSchema, KeywordSchema } from "$server/models/keyword";

function useKeywordsInput(initialKeywords: KeywordSchema[] = []) {
  const [keywords, setKeywords] =
    useState<KeywordPropSchema[]>(initialKeywords);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const onInput = (value: string) => setValue(value);
  const onReset = () => {
    setValue("");
    setError(false);
    setHelperText("");
  };
  const onKeywordSubmit = (keyword: KeywordPropSchema) => {
    if (keyword.name === "") {
      setError(true);
      setHelperText("1文字以上入力してください");
      return;
    } else if (keywords.some(({ name }) => name === keyword.name)) {
      setHelperText("すでに追加されているキーワードです");
      return;
    } else onReset();
    return setKeywords([...keywords, keyword]);
  };
  return {
    keywords,
    onKeywordsUpdate: setKeywords,
    onKeywordSubmit,
    value,
    error,
    helperText,
    onReset,
    onInput,
  };
}

export default useKeywordsInput;
