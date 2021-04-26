import { stringify, parse } from "./getLearnerActivities";

test("stringify", () => {
  const book = { id: 1 };
  const topic = { id: 2 };
  const index = 0;
  expect(stringify({ book, topic, index })).toBe("1-2-0");
});

test("parse", () => {
  expect(parse("1-2-0")).toEqual({
    book: { id: 1 },
    topic: { id: 2 },
    index: 0,
  });
});

test("stringify and parse", () => {
  const book = { id: 1 };
  const topic = { id: 2 };
  const index = 0;
  expect(
    parse(
      stringify({
        book,
        topic,
        index,
      })
    )
  ).toEqual({
    book,
    topic,
    index,
  });
});
