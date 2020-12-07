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
  <Video type="youtube" src="3yfen-t49eI" {...props} />
);

export const Vimeo = () => <Video type="vimeo" src="1084537" {...props} />;

export const Wowza = () => <Video type="wowza" src="sample.mp4" {...props} />;
