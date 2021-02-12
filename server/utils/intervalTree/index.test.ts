import { IntervalTree } from "./";

describe("insertOrExpand()", function () {
  test("重複する範囲が存在するならば拡張", function () {
    const tree = new IntervalTree();
    tree.insert({ low: 0, high: 0.5 });
    tree.insert({ low: 1.5, high: 2 });
    tree.insertOrExpand({ low: 0.5, high: 1.5 });
    expect([...tree.inOrder()]).toEqual([{ low: 0, high: 2 }]);
  });

  test("より低い範囲が存在するならば低い範囲に拡張", function () {
    const tree = new IntervalTree();
    tree.insert({ low: 0, high: 1 });
    tree.insertOrExpand({ low: 0.5, high: 1.5 });
    expect([...tree.inOrder()]).toEqual([{ low: 0, high: 1.5 }]);
  });

  test("より高い範囲が存在するならば高い範囲に拡張", function () {
    const tree = new IntervalTree();
    tree.insert({ low: 1, high: 2 });
    tree.insertOrExpand({ low: 0.5, high: 1.5 });
    expect([...tree.inOrder()]).toEqual([{ low: 0.5, high: 2 }]);
  });

  test("重複する範囲が存在しないならば挿入", function () {
    const tree = new IntervalTree();
    tree.insert({ low: 0, high: 0.49 });
    tree.insert({ low: 1.51, high: 2 });
    tree.insertOrExpand({ low: 0.5, high: 1.5 });
    expect([...tree.inOrder()]).toEqual([
      { low: 0, high: 0.49 },
      { low: 0.5, high: 1.5 },
      { low: 1.51, high: 2 },
    ]);
  });
});
