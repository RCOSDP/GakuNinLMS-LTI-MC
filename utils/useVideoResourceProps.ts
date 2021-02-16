import { useState, useEffect } from "react";
import type { VideoResource } from "$server/models/videoResource";
import type { ResourceSchema } from "$server/models/resource";
import { parse, isVideoResource } from "$utils/videoResource";
import { useVideoTrackAtom } from "$store/videoTrack";

function useVideoResourceProps(
  resource: ResourceSchema | VideoResource | undefined
) {
  const [videoResource, setVideoResource] = useState<VideoResource | undefined>(
    isVideoResource(resource) ? resource : undefined
  );
  const { videoTracks, setVideoTracks } = useVideoTrackAtom();
  useEffect(() => {
    if (isVideoResource(resource)) setVideoTracks(resource.tracks);
  }, [resource, setVideoTracks]);
  const [url, setUrl] = useState<string | undefined>(resource?.url);
  useEffect(() => {
    const newVideoResource = parse(url ?? "");
    newVideoResource
      ? setVideoResource({
          ...newVideoResource,
          tracks: videoTracks,
        })
      : setVideoResource(undefined);
  }, [url, videoTracks]);
  return {
    videoResource,
    setUrl,
  };
}

export default useVideoResourceProps;
