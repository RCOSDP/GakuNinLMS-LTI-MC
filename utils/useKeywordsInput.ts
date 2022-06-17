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
    const trimmed = keyword.name.trim();
    if (trimmed === "") {
      setError(true);
      setHelperText("1文字以上入力してください");
      return;
    } else if (keywords.some(({ name }) => name === trimmed)) {
      setHelperText("すでに追加されているキーワードです");
      return;
    } else onReset();
    return setKeywords([...keywords, { name: trimmed }]);
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
