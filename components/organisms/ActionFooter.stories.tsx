export default { title: "organisms/ActionFooter" };

import ActionFooter from "./ActionFooter";
import Button from "@mui/material/Button";

export const Default = () => (
  <ActionFooter maxWidth="md">
    <Button size="small" color="primary" variant="text">
      キャンセル
    </Button>
    <Button size="large" color="primary" variant="contained">
      再利用
    </Button>
  </ActionFooter>
);
