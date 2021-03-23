import { useState } from "react";

function useSelectorProps<T>(defaultValue: null | T) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<null | T>(defaultValue);
  const onOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const onClose = () => setAnchorEl(null);
  return {
    anchorEl,
    onOpen,
    onClose,
    value,
    setValue,
  };
}

export default useSelectorProps;
