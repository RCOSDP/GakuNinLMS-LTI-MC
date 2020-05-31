import { useContentsIndex } from "components/contents";
import { useAppTitle } from "components/state";
import { ContentsSelectorTable } from "components/ContentsTable";
import { Typography } from "@material-ui/core";

function Index() {
  const contentsIndex = useContentsIndex();
  useAppTitle()("学習管理システム連携");
  switch (contentsIndex.state) {
    case "failure":
      return <div>failed to load</div>;
    case "pending":
      return <div>loading...</div>;
  }
  return (
    <div>
      <ContentsSelectorTable contentsIndex={contentsIndex} />
      <Typography>
        選択したコンテンツを学習管理システムに紐付けます。
      </Typography>
    </div>
  );
}

export default Index;
