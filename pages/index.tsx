import { useEffect } from "react";

export default function () {
  const to = new URL(
    process.env.NEXT_PUBLIC_API_BASE_PATH || "",
    document.location.href
  );
  useEffect(() => {
    if (document.location.href !== to.href) {
      document.location.replace(to.href);
    }
  }, []);
  return <a href={to.href}>Redirect</a>;
}
