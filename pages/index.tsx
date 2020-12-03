import { UrlObject } from "url";
import { useRouter } from "next/router";
import Link from "next/link";
import { isInstructor, useSession } from "$utils/session";

function Replace(props: { href: string | UrlObject }) {
  const router = useRouter();
  router.replace(props.href);
  return <Link href={props.href}>Link</Link>; // TODO: プレースホルダーがいい加減
}

function Index() {
  const session = useSession();

  if (!session.data) return <div>Loading...</div>; // TODO: プレースホルダーがいい加減

  // TODO: エラーハンドリング

  if (isInstructor(session.data)) return <Replace href="/books" />;

  return <Replace href="/books" />; // TODO: LTI Resource Link に応じてルーティング
}

export default Index;
