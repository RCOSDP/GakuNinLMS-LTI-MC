export default { title: "atoms/IconButton" };

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "./IconButton";

export const Default = () => {
  return (
    <IconButton tooltipProps={{ title: "閉じる" }} size="large">
      <CloseIcon />
    </IconButton>
  );
};
