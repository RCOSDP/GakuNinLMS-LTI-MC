import { useEffect } from "react";

export default function () {
  useEffect(() => {
    const to = new URL(
      process.env.NEXT_PUBLIC_API_BASE_PATH || "",
      document.location.href
    );
    if (document.location.href !== to.href) document.location.href = to.href;
  }, []);
  return <div>redirecting...</div>;
}
