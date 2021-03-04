import { VideoResource } from "$server/models/videoResource";
import VideoResourceMatcher from "$server/types/videoResourceMatcher";
import { providerMatchers } from "$server/config/video/provider";
import validUrl from "./validUrl";

const defaultResource = (url: URL): VideoResource => ({
  url: url.href,
  providerUrl: `${url.origin}/`,
  tracks: [],
});

const hostMatch = (url: URL) => (matcher: VideoResourceMatcher): boolean =>
  matcher.host.test(url.host);

export function providerMatch(value: string): boolean {
  const url = validUrl(value);
  return Boolean(url && providerMatchers.find(hostMatch(url)));
}

export function parse(value: string): VideoResource | undefined {
  if (!validUrl(value)) return;

  const url = new URL(value);
  const matcher = providerMatchers.find(hostMatch(url));

  if (!matcher) return defaultResource(url);

  return {
    providerUrl: matcher.providerUrl,
    url: matcher.url(url),
    tracks: [],
  };
}
