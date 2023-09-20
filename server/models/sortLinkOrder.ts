const sortLinkOrder = [
  "updated",
  "reverse-updated",
  "created",
  "reverse-created",
  "title",
  "reverse-title",
] as const;

export type SortLinkOrder = (typeof sortLinkOrder)[number];

export default sortLinkOrder;
