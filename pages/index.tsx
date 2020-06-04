import { useSession } from "components/api";
import { useRouter } from "components/router";

export default function () {
  const { data, error } = useSession();
  const router = useRouter();

  if (error) return <div>failed to load</div>;
  if (data?.contents) {
    router.replace({
      pathname: "/contents",
      query: {
        id: data.contents,
        action: "show",
      },
    });
  }

  return <div>Loading...</div>;
}
