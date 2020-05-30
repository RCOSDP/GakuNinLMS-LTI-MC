import MuiLink from "@material-ui/core/Link";
import NextLink from "next/link";
import { UrlObject, format } from "url";
import { ReactNode } from "react";
import { useRouter as useNextRouter } from "next/router";
import * as config from "next.config.js";

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
      ? `${config.experimental.basePath}${props.href}.html`
      : format({
          ...props.href,
          pathname: `${config.experimental.basePath}${props.href.pathname}.html`,
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
        ? `${config.experimental.basePath}${urlOrPath}.html`
        : format({
            ...urlOrPath,
            pathname: `${config.experimental.basePath}${urlOrPath.pathname}.html`,
          }));

    return originalPush(urlOrPath, url);
  }
  router.push = push;

  return router;
}
