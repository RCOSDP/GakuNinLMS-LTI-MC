import { useContentsIndex } from "components/contents";
import { useAppTitle } from "components/state";
import { useLmsInstructor } from "components/session";
import { ContentsSelectorTable } from "components/ContentsTable";
import { Typography } from "@material-ui/core";

function Index() {
  useLmsInstructor();
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
      <Typography>
        選択したコンテンツを学習管理システムに紐付けます。紐付ける学習コンテンツを選択してください。
      </Typography>
      <ContentsSelectorTable {...contentsIndex} />
    </div>
  );
}

export default Index;
