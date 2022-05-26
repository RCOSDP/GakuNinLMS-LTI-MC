import type { VideoResource } from "$server/models/videoResource";
import type VideoResourceMatcher from "$server/types/videoResourceMatcher";
import { providerMatchers } from "$server/config/video/provider";
import getValidUrl from "./getValidUrl";

const defaultResource = (url: URL): VideoResource => ({
  url: url.href,
  providerUrl: `${url.origin}/`,
  tracks: [],
  accessToken: "",
});

const hostMatch =
  (url: URL) =>
  (matcher: VideoResourceMatcher): boolean =>
    matcher.host.test(url.host);

export function providerMatch(value: string): boolean {
  const url = getValidUrl(value);
  return Boolean(url && providerMatchers.find(hostMatch(url)));
}

export function parse(value: string): VideoResource | undefined {
  if (!getValidUrl(value)) return;

  const url = new URL(value);
  const matcher = providerMatchers.find(hostMatch(url));

  if (!matcher) return defaultResource(url);

  return {
    providerUrl: matcher.providerUrl,
    url: matcher.url(url),
    tracks: [],
    accessToken: "",
  };
}
