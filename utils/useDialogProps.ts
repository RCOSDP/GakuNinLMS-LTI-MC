import { SetStateAction, useState, useCallback } from "react";

function useDialogProps<T>() {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState<T>();
  const onClose = useCallback(() => {
    setOpen(() => false);
  }, [setOpen]);
  const dispatch = useCallback(
    (state: SetStateAction<T | undefined>) => {
      setOpen(() => true);
      setData(state);
    },
    [setOpen, setData]
  );
  return {
    data,
    open: data != null && open,
    onClose,
    dispatch,
  };
}

export default useDialogProps;
