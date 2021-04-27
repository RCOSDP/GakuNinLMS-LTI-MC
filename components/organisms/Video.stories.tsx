export default { title: "organisms/Video" };

import { outdent } from "outdent";
import Video from "./Video";

const defaultProps = {
  tracks: [
    {
      id: 1,
      kind: "subtitles",
      language: "ja",
      url: URL.createObjectURL(
        new Blob([
          outdent`
            WEBVTT

            00:01.000 --> 00:04.000
            液体窒素は飲み物ではありません。`,
        ])
      ),
    },
  ],
  autoplay: true,
};

export const YouTube = () => (
  <Video
    providerUrl="https://www.youtube.com/"
    url="https://www.youtube.com/watch?v=3yfen-t49eI"
    {...defaultProps}
  />
);

export const Vimeo = () => (
  <Video
    providerUrl="https://vimeo.com/"
    url="https://vimeo.com/1084537"
    {...defaultProps}
  />
);

export const Wowza = () => (
  <Video
    providerUrl="https://wowzaec2demo.streamlock.net/"
    url="https://wowzaec2demo.streamlock.net/vod/mp4/playlist.m3u8"
    {...defaultProps}
  />
);
