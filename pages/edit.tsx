import { Link } from "components/theme";
import { useContents } from "components/hooks";
import { useDispatch } from "components/state";

function Index() {
  const title = "学習コンテンツの変更";
  const description = "学習管理システムに紐付けるコンテンツを選んで下さい";
  useDispatch()((s) => ({ ...s, title }));
  const { data, error } = useContents();

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      {data.map(({ id, name }) => (
        <div key={id}>
          {id}:{" "}
          <Link href={{ pathname: "/edit", query: { id } }}>
            {name || "名称未設定"}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Index;
