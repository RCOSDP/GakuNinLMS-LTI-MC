export default { title: "organisms/TopBar" };

import TopBar from "./TopBar";
import Button from "@material-ui/core/Button";

export const Default = () => (
  <TopBar
    title="タイトル"
    action={
      <Button color="primary" variant="contained">
        ボタン
      </Button>
    }
  />
);

export const UseContainer = () => (
  <TopBar
    maxWidth="sm"
    title="タイトル"
    action={
      <Button color="primary" variant="contained">
        ボタン
      </Button>
    }
  />
);
