import { useContents } from "components/hooks";
import { ContentsTable } from "components/ContentsTable";
import { ShowContent, ShowContentProps } from "components/ShowContents";
import { useRouter } from "components/hooks";
import { ShowSession } from "components/ShowSession";

type Query = Partial<ShowContentProps> & { action?: "edit" | "new" };

function Index() {
  const title = "学習コンテンツの管理";
  const { data, error } = useContents();

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <h1>{title}</h1>
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
