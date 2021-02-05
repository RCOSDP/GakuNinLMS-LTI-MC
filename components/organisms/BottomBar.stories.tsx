export default { title: "organisms/BottomBar" };

import BottomBar from "./BottomBar";
import Button from "@material-ui/core/Button";

export const Default = () => (
  <BottomBar maxWidth="md">
    <Button size="small" color="primary" variant="text">
      キャンセル
    </Button>
    <Button size="large" color="primary" variant="contained">
      インポート
    </Button>
  </BottomBar>
);
