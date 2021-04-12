import user from "./user";
import topic from "./topic";
import type { LearnerActivitySchema } from "$server/models/learnerActivity";

const learnerActivity: LearnerActivitySchema = {
  id: user.id,
  name: user.name,
  activities: [
    {
      topic,
      completed: true,
      totalTimeMs: 120,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      topic: {
        ...topic,
        id: 2,
      },
      completed: true,
      totalTimeMs: 120,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      topic: {
        ...topic,
        id: 3,
      },
      completed: false,
      totalTimeMs: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      topic: {
        ...topic,
        id: 4,
      },
      completed: false,
      totalTimeMs: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      topic: {
        ...topic,
        id: 5,
      },
      completed: false,
      totalTimeMs: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      topic: {
        ...topic,
        id: 6,
      },
      completed: false,
      totalTimeMs: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

export default learnerActivity;
