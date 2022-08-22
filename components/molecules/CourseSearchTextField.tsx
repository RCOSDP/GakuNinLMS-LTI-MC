import { useState, useCallback } from "react";
import type { TextFieldProps } from "@mui/material/TextField";
import SearchTextField from "$atoms/SearchTextField";

type Props = Omit<TextFieldProps, "variant" | "value"> & {
  onSearchSubmit(value: string): void;
};

function CourseSearchTextField({ onSearchSubmit, ...props }: Props) {
  const [value, setValue] = useState("");
  const reset = useCallback(() => {
    setValue("");
    onSearchSubmit("");
  }, [setValue, onSearchSubmit]);

  return (
    <SearchTextField
      {...props}
      value={value}
      onSearchInput={setValue}
      onSearchInputReset={reset}
      onSearchSubmit={onSearchSubmit}
    />
  );
}

export default CourseSearchTextField;
