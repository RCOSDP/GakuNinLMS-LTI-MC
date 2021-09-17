import { outdent } from "outdent";

const resource = {
  id: 1,
  /** @deprecated */
  videoId: 1,
  url: "https://www.youtube.com/watch?v=YzVwrvbz_XA",
  providerUrl: "https://www.youtube.com/",
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
    {
      id: 2,
      kind: "subtitles",
      language: "en",
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
  details: {},
};

export default resource;
