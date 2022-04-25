import { useState } from "react";

function useDomainsInput(initialDomains: string[] = []) {
  const [domains, setDomains] = useState(initialDomains);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const onInput = (value: string) => setValue(value);
  const onReset = () => {
    setValue("");
    setError(false);
    setHelperText("");
  };
  const onDomainSubmit = (newDomain: string) => {
    if (newDomain === "") {
      setError(true);
      setHelperText("1文字以上入力してください");
      return;
    } else if (domains.some((domain) => domain === newDomain)) {
      setHelperText("すでに追加されているドメインです");
      return;
    } else onReset();
    return setDomains([...domains, newDomain]);
  };
  return {
    domains,
    onDomainsUpdate: setDomains,
    onDomainSubmit,
    value,
    error,
    helperText,
    onReset,
    onInput,
  };
}

export default useDomainsInput;
