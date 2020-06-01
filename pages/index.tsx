import { useEffect } from "react";

const path = process.env.NEXT_PUBLIC_API_BASE_PATH || "";
export default function () {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(path, document.location.href).href
    if (document.location.href !== url) {
      document.location.replace(url);
    }
  }, []);
  return <a href={path}>Redirect</a>;
}
