import ISO6391 from "iso-639-1";
import { VideoTrackSchema } from "$server/models/videoTrack";
import { NEXT_PUBLIC_API_BASE_PATH } from "$utils/env";

function buildTrack(
  track: VideoTrackSchema
): { kind: "subtitles"; src: string; srclang: string; label: string } {
  return {
    kind: "subtitles",
    src: new URL(track.url, NEXT_PUBLIC_API_BASE_PATH).href,
    srclang: track.language,
    label: ISO6391.getNativeName(track.language),
  };
}

function buildTracks(tracks: VideoTrackSchema[]) {
  return tracks.map(buildTrack);
}

export default buildTracks;
