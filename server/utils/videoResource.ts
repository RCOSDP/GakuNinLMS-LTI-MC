import VideoResource from "$server/models/videoResource";
import VideoResourceMatcher from "$server/types/videoResourceMatcher";
import { providerMatchers } from "$server/config/video/provider";
import validUrl from "./validUrl";

const hostMatch = (url: URL) => (matcher: VideoResourceMatcher): boolean =>
  matcher.host.test(url.host);

function match(url: URL): VideoResource | undefined {
  const location = providerMatchers.find(hostMatch(url));
  return (
    location && { providerUrl: location.providerUrl, url: location.url(url) }
  );
}

export function parse(value: string): VideoResource | undefined {
  if (!validUrl(value)) return;
  return match(new URL(value));
}
