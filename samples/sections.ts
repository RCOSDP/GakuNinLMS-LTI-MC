import topic from "./topic";
import section from "./section";

const sections = [
  {
    ...section,
    id: 1,
    topics: [
      { ...topic, id: 1 },
      { ...topic, id: 2 },
      { ...topic, id: 3 },
    ],
  },
  {
    ...section,
    id: 2,
    name: null,
    topics: [topic],
  },
];

export default sections;
