export default { title: "atoms/IconButton" };

import CloseIcon from "@material-ui/icons/Close";
import IconButton from "./IconButton";

export const Default = () => {
  return (
    <IconButton tooltipProps={{ title: "閉じる" }}>
      <CloseIcon />
    </IconButton>
  );
};
