import type { ResourceSchema } from "$server/models/resource";

const oEmbedProviderMatchers = [
  {
    host: /(^|\.)youtube\.com$/,
    providerUrl: "https://www.youtube.com/oembed",
  },
  {
    host: /^youtu\.be$/,
    providerUrl: "https://www.youtube.com/oembed",
  },
  {
    host: /^vimeo\.com$/,
    providerUrl: "https://vimeo.com/oembed.json",
  },
] as const;

const hostMatch =
  (url: URL) =>
  (matcher: typeof oEmbedProviderMatchers[number]): boolean =>
    matcher.host.test(url.host);

/** リソースからoEmbed Providerを得る */
function resourceToOEmbedProvider(resource: ResourceSchema) {
  const url = new URL(resource.url);
  const matcher = oEmbedProviderMatchers.find(hostMatch(url));
  return matcher?.providerUrl;
}

export default resourceToOEmbedProvider;
