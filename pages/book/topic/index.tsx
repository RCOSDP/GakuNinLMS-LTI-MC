import { useEffect } from "react";
import { useRouter } from "next/router";
import Placeholder from "$templates/Placeholder";
import { pagesPath } from "$utils/$path";

function Router() {
  const router = useRouter();
  useEffect(() => {
    void router.replace(
      pagesPath.book.$url({ query: { bookId: Number(router.query.bookId) } })
    );
  }, [router]);
  return <Placeholder />;
}

export default Router;
