import type { Track, Prisma } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";

export type VideoTrackProps = Pick<
  Prisma.TrackCreateWithoutVideoInput,
  "language"
> & {
  content: Track["content"] | Blob;
};

export type VideoTrackSchema = Pick<Track, "id" | "kind" | "language"> & {
  url: string;
};

const { id, kind, language, content } = jsonSchema.definitions.Track.properties;

export const videoTrackPropsSchema = {
  type: "object",
  properties: { language, content },
};

export const videoTrackSchema = {
  type: "object",
  properties: { id, kind, language, url: { type: "string" } },
};
