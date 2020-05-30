import { useContents } from "components/hooks";
import { ContentsTable } from "components/ContentsTable";
import { ShowContent, ShowContentProps } from "components/ShowContents";
import { useRouter } from "components/router";
import { ShowSession } from "components/ShowSession";
import { useAppTitle } from "components/state";

type Query = Partial<ShowContentProps> & { action?: "edit" | "new" };

function Index() {
  const { data, error } = useContents();

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <ContentsTable
        data={data.map(({ id, name }) => ({
          id,
          name,
          editable: true,
        }))}
      />
    </div>
  );
}

const Show = ShowContent;
const Edit = ShowContent;
const New = ShowSession;

function Router() {
  const router = useRouter();
  const query: Query = router.query;

  useAppTitle()("学習コンテンツ管理");

  if (!query.id) {
    switch (query.action) {
      default:
        return <Index />;
      case "new":
        return <New />;
    }
  }

  switch (query.action) {
    default:
      return <Show id={query.id} />;
    case "edit":
      return <Edit id={query.id} />;
  }
}

export default Router;
