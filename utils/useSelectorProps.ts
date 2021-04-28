import { useState } from "react";

function useSelectorProps<T>(defaultValue: null | T) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<null | T>(defaultValue);
  const onOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const onClose = () => setAnchorEl(null);
  const onSelect = (value: T) => {
    setValue(value);
    onClose();
  };
  return {
    anchorEl,
    open: Boolean(anchorEl),
    value,
    onOpen,
    onClose,
    onSelect,
  };
}

export default useSelectorProps;
