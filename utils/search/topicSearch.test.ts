import topicSearch from "./topicSearch";

test("トピック名による絞り込み", () => {
  const topic = {
    id: 1,
    resourceId: 1,
    name: "Topic 1",
    description: "",
    language: "en",
    timeRequired: 10,
    shared: true,
    license: "",
    authors: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    resource: {
      id: 1,
      videoId: 1,
      url: "https://example/",
      providerUrl: "https://example/",
      details: {},
    },
    details: {},
  };
  expect(
    topicSearch([topic, { ...topic, name: "なんとかかんとか" }], {
      keywords: ["top"],
      ltiResourceLinks: [],
    })
  ).toEqual([topic]);
});

test("トピック著者による絞り込み", () => {
  const topic = {
    id: 1,
    resourceId: 1,
    name: "Topic 1",
    description: "",
    language: "en",
    timeRequired: 10,
    shared: true,
    license: "",
    authors: [
      {
        id: 3,
        name: "山田三郎",
        ltiConsumerId: "",
        ltiUserId: "",
        email: "",
        roleName: "",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    resource: {
      id: 1,
      videoId: 1,
      url: "https://example/",
      providerUrl: "https://example/",
      details: {},
    },
    details: {},
  };
  expect(
    topicSearch([topic], {
      keywords: ["山田三郎"],
      ltiResourceLinks: [],
    })
  ).toEqual([topic]);
});
