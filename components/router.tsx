import MuiLink from "@material-ui/core/Link";
import NextLink from "next/link";
import { UrlObject, format } from "url";
import { ReactNode } from "react";
import { useRouter as useNextRouter } from "next/router";

const basePath =
  (process.env.NEXT_PUBLIC_API_BASE_PATH &&
    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/beta`) ||
  "";

export const validUrl = (url: any) => {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

export const Link = (props: {
  href: string | UrlObject;
  children: ReactNode;
}) => {
  const url =
    validUrl(props.href)?.href ??
    (typeof props.href === "string"
      ? `${basePath}${props.href}.html`
      : format({
          ...props.href,
          pathname: `${basePath}${props.href.pathname}.html`,
        }));

  return (
    <NextLink href={props.href} as={url}>
      <MuiLink variant="body1" href={url}>
        {props.children}
      </MuiLink>
    </NextLink>
  );
};

export function useRouter() {
  const router = useNextRouter();
  const originalPush = router.push;
  function push(urlOrPath: string | UrlObject) {
    const url =
      validUrl(urlOrPath)?.href ??
      (typeof urlOrPath === "string"
        ? `${basePath}${urlOrPath}.html`
        : format({
            ...urlOrPath,
            pathname: `${basePath}${urlOrPath.pathname}.html`,
          }));

    return originalPush(urlOrPath, url);
  }
  router.push = push;

  return router;
}
