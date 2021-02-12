import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import type { VideoResource } from "$server/models/videoResource";
import type { ResourceSchema } from "$server/models/resource";
import { parse, isVideoResource } from "$utils/videoResource";

function useVideoResourceProps(
  resource: ResourceSchema | VideoResource | undefined
) {
  const [videoResource, setVideoResource] = useState<VideoResource | undefined>(
    isVideoResource(resource) ? resource : undefined
  );
  const [url, setUrl] = useState<string | undefined>();
  const [debouncedUrl] = useDebounce(url, 500);
  useEffect(() => {
    if (!debouncedUrl) return;
    const newVideoResource = parse(debouncedUrl);
    if (!newVideoResource) return;
    if (videoResource && newVideoResource.url === videoResource.url) return;
    setVideoResource({ ...newVideoResource });
  }, [debouncedUrl, videoResource]);
  return {
    videoResource,
    setUrl,
  };
}

export default useVideoResourceProps;
