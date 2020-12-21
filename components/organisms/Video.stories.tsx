export default { title: "organisms/Video" };

import Video from "./Video";

const props = {
  subtitles: [
    {
      lang: "en",
      file: new File([], "sample_file.vtt"),
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
