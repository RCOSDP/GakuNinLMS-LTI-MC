import { describe, expect, it } from "vitest";
import groupBy from "./groupBy";

describe("groupBy", () => {
  it("groups items by key", () => {
    expect(
      groupBy(
        [
          { role: "author", name: "Alice" },
          { role: "author", name: "Bob" },
          { role: "editor", name: "Carol" },
        ],
        (item) => item.role
      )
    ).toEqual({
      author: [
        { role: "author", name: "Alice" },
        { role: "author", name: "Bob" },
      ],
      editor: [{ role: "editor", name: "Carol" }],
    });
  });
});
