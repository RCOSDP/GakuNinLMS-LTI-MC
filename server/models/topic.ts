import { Topic, ResourceCreateWithoutTopicsInput } from "$prisma/client";

export type TopicProps = Pick<
  Topic,
  "name" | "timeRequired" | "description"
> & {
  resource: Omit<ResourceCreateWithoutTopicsInput, "details">;
};
