import { User } from "$prisma/client";

const users: readonly User[] = [
  {
    id: 1,
    ltiUserId: "2",
    name: "Admin User",
  },
];

export default users;
