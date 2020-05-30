import { useContents } from "components/hooks";
import { useAppTitle } from "components/state";
import { ContentsSelectorTable } from "components/ContentsTable";
import { Typography } from "@material-ui/core";

function Index() {
  const { data, error } = useContents();
  useAppTitle()("学習管理システム連携");

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div>
      <ContentsSelectorTable data={data} />
      <Typography>
        選択したコンテンツを学習管理システムに紐付けます。
      </Typography>
    </div>
  );
}

export default Index;
