import { Section } from "$prisma/client";
import { TopicProps } from "$server/models/topic";

export type SectionProps = {
  name?: Section["name"];
  topics: Array<TopicProps>;
};
