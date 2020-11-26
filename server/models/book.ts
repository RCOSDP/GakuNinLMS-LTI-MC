import { BookCreateWithoutAuthorInput, User } from "$prisma/client";
import { SectionProps } from "./book/section";

export type BookProps = Omit<
  BookCreateWithoutAuthorInput,
  "details" | "sections"
> & {
  authorId: User["id"];
  sections: Array<SectionProps>;
};
