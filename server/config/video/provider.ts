import type VideoResourceMatcher from "$server/types/videoResourceMatcher";

const youtubeBaseUrl = "https://www.youtube.com/watch?v=";
const vimeoBaseUrl = "https://vimeo.com/";

export const providerMatchers: Array<VideoResourceMatcher> = [
  {
    host: /(^|\.)youtube\.com$/,
    providerUrl: "https://www.youtube.com/",
    url: (url) => [youtubeBaseUrl, url.searchParams.get("v") ?? ""].join(""),
  },
  {
    host: /^youtu\.be$/,
    providerUrl: "https://www.youtube.com/",
    url: (url) => [youtubeBaseUrl, url.pathname.split("/")[1] ?? ""].join(""),
  },
  {
    host: /^vimeo\.com$/,
    providerUrl: "https://vimeo.com/",
    url: (url) =>
      [
        vimeoBaseUrl,
        url.pathname.split("/").find((path) => /^\d+$/.test(path)) ?? "",
      ].join(""),
  },
];
