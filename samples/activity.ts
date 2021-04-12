import user from "./user";
import topic from "./topic";

const activity = {
  learner: {
    id: user.id,
    name: user.name,
  },
  topic: {
    id: topic.id,
    name: topic.name,
  },
  completed: true,
  totalTimeMs: 120,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default activity;
