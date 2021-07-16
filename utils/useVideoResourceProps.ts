import { useState, useEffect, useCallback } from "react";
import type { VideoResource } from "$server/models/videoResource";
import type { ResourceSchema } from "$server/models/resource";
import { isVideoResource, getValidVideoResource } from "$utils/videoResource";
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
  const setUrl = useCallback(
    (url: string | undefined) => {
      const nextVideoResource = getValidVideoResource(url);
      setVideoResource(
        nextVideoResource && { ...nextVideoResource, tracks: videoTracks }
      );
    },
    [videoTracks]
  );
  return {
    videoResource,
    setUrl,
  };
}

export default useVideoResourceProps;
