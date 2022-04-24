import type { PublicBook } from "@prisma/client";

export type PublicBookSchema = Pick<PublicBook, "id" | "bookId" | "userId">;

export const publicBookSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    domains: { type: "array", items: { type: "string" } },
    expireAt: { type: "string", nullable: true, format: "date-time" },
    token: { type: "string" },
  },
  nullable: true,
} as const;
