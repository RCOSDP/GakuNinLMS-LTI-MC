import { stringify, parse } from "./getLearnerActivities";

test("stringify", () => {
  const book = { id: 1 };
  const topic = { id: 2 };
  expect(stringify({ book, topic })).toBe("1-2");
});

test("parse", () => {
  expect(parse("1-2")).toEqual({
    book: { id: 1 },
    topic: { id: 2 },
  });
});

test("stringify and parse", () => {
  const book = { id: 1 };
  const topic = { id: 2 };
  expect(parse(stringify({ book, topic }))).toEqual({ book, topic });
});
