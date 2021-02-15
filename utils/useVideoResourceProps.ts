import { useState, useEffect } from "react";
import type { VideoResource } from "$server/models/videoResource";
import type { VideoTrackSchema } from "$server/models/videoTrack";
import type { ResourceSchema } from "$server/models/resource";
import { parse, isVideoResource } from "$utils/videoResource";

function useVideoResourceProps(
  resource: ResourceSchema | VideoResource | undefined
) {
  const [videoResource, setVideoResource] = useState<VideoResource | undefined>(
    isVideoResource(resource) ? resource : undefined
  );
  const [tracks, setTracks] = useState<VideoTrackSchema[]>(
    isVideoResource(resource) ? resource.tracks : []
  );
  const addTrack = (track: VideoTrackSchema) => {
    const newTracks = tracks.slice();
    newTracks.push(track);
    setTracks(newTracks);
  };
  const deleteTrack = ({ id }: Pick<VideoTrackSchema, "id">) => {
    const newTracks = tracks.slice();
    const index = newTracks.findIndex((track) => track.id === id);
    newTracks.splice(index, 1);
    setTracks(newTracks);
  };
  const [url, setUrl] = useState<string | undefined>(resource?.url);
  useEffect(() => {
    const newVideoResource = parse(url ?? "");
    newVideoResource
      ? setVideoResource({ ...newVideoResource, tracks })
      : setVideoResource(undefined);
  }, [url, tracks]);
  return {
    videoResource,
    setUrl,
    addTrack,
    deleteTrack,
  };
}

export default useVideoResourceProps;
