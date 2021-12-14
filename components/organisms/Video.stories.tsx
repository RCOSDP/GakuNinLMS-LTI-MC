import Video from "./Video";
import type { Story } from "@storybook/react";
import { resource } from "$samples";

export default { title: "organisms/Video", component: Video };

const Template: Story<Parameters<typeof Video>[0]> = (args) => {
  return <Video {...args} />;
};

export const YouTube = Template.bind({});
YouTube.args = {
  resource: {
    ...resource,
    providerUrl: "https://www.youtube.com/",
    url: "https://www.youtube.com/watch?v=3yfen-t49eI",
  },
};

export const Vimeo = Template.bind({});
Vimeo.args = {
  resource: {
    ...resource,
    providerUrl: "https://vimeo.com/",
    url: "https://vimeo.com/1084537",
  },
};

export const Wowza = Template.bind({});
Wowza.args = {
  resource: {
    ...resource,
    providerUrl: "https://wowzaec2demo.streamlock.net/",
    url: "https://wowzaec2demo.streamlock.net/vod/mp4/playlist.m3u8",
  },
};
