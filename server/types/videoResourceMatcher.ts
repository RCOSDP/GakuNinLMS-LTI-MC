import { VideoResource } from "$server/models/videoResource";

type VideoResourceMatcher = {
  host: RegExp;
  providerUrl: VideoResource["providerUrl"];
  url: (url: URL) => VideoResource["url"];
};

export default VideoResourceMatcher;
