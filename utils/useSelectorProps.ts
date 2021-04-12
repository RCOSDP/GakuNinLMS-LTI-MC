import { useState } from "react";

function useSelectorProps<T>(defaultValue: T) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<T>(defaultValue);
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
