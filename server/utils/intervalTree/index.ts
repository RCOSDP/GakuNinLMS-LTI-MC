import { Interval, IntervalTree as NodeIntervalTree } from "node-interval-tree";

const { min, max } = Math;

export class IntervalTree<T extends Interval> extends NodeIntervalTree<T> {
  /** 区間の挿入または拡張 */
  insertOrExpand(interval: T): boolean {
    let { low, high } = interval;
    this.search(low, high).forEach((range) => {
      [low, high] = [min(low, range.low), max(high, range.high)];
      this.remove(range);
    });
    return this.insert({ ...interval, low, high });
  }
}
