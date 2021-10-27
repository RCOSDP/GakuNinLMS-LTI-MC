import { outdent } from "outdent";
import Video from "./Video";
import type { Story } from "@storybook/react";

export default { title: "organisms/Video", component: Video };

const defaultArgs = {
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

const Template: Story<Parameters<typeof Video>[0]> = (args) => {
  return <Video {...args} />;
};

export const YouTube = Template.bind({});
YouTube.args = {
  ...defaultArgs,
  providerUrl: "https://www.youtube.com/",
  url: "https://www.youtube.com/watch?v=3yfen-t49eI",
};

export const Vimeo = Template.bind({});
Vimeo.args = {
  ...defaultArgs,
  providerUrl: "https://vimeo.com/",
  url: "https://vimeo.com/1084537",
};

export const Wowza = Template.bind({});
Wowza.args = {
  ...defaultArgs,
  providerUrl: "https://wowzaec2demo.streamlock.net/",
  url: "https://wowzaec2demo.streamlock.net/vod/mp4/playlist.m3u8",
};
