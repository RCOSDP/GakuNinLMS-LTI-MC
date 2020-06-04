import { useLmsSession } from "components/session";
import { useRouter } from "components/router";

export default function () {
  const sesssion = useLmsSession();
  const router = useRouter();

  if (sesssion?.contents) {
    router.replace({
      pathname: "/contents",
      query: {
        id: sesssion.contents,
        action: "show",
      },
    });
  }

  return <div>Loading...</div>;
}
