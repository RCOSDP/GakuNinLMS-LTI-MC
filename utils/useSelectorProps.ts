import { useState } from "react";

function useSelectorProps<T>(defaultValue: T) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<T>(defaultValue);
  const onOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const onClose = () => setAnchorEl(null);
  const onSelect = (value: T) => {
    setValue(value);
    onClose();
  };
  return {
    anchorEl,
    value,
    onOpen,
    onClose,
    onSelect,
  };
}

export default useSelectorProps;
