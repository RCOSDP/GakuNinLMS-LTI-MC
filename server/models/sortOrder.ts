const sortOrder = [
  "updated",
  "reverse-updated",
  "created",
  "reverse-created",
  "name",
  "reverse-name",
] as const;

export type SortOrder = typeof sortOrder[number];

export default sortOrder;
