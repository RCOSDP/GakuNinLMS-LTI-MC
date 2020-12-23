export default { title: "organisms/Video" };

import { outdent } from "outdent";
import Video from "./Video";

const props = {
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
    {...props}
  />
);

export const Vimeo = () => (
  <Video
    providerUrl="https://vimeo.com/"
    url="https://vimeo.com/1084537"
    {...props}
  />
);

// TODO: 未サポート
// export const Wowza = () => <Video type="wowza" src="sample.mp4" {...props} />;
