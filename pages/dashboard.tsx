import Dashboard from "$templates/Dashboard";
import Placeholder from "$templates/Placeholder";
import Problem from "$organisms/Problem";
import { useSessionAtom } from "$store/session";
import useActivity from "$utils/useActivity";

function Index() {
  const { session } = useSessionAtom();
  const { data, error } = useActivity();

  if (error) return <Problem title="学習分析データの取得に失敗しました" />;
  if (!session) return <Placeholder />;
  if (!data) return <Placeholder />;

  return <Dashboard session={session} {...data} />;
}

export default Index;
