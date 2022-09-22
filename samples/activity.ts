import user from "./user";
import topic from "./topic";

const activity = {
  learner: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
  topic: {
    id: topic.id,
    name: topic.name,
    timeRequired: topic.timeRequired,
  },
  completed: true,
  totalTimeMs: 60000,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default activity;
