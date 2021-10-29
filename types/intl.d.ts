// NOTE: https://github.com/Microsoft/TypeScript/issues/29129 が解決したら取り除いて
declare namespace Intl {
  class ListFormat {
    constructor(
      locales?: string | string[],
      options?: {
        localeMatcher?: "lookup" | "best fit";
        type?: "conjunction" | "disjunction" | "unit";
        style?: "long" | "short" | "narrow";
      }
    );
    format(list: string[]);
  }
}
