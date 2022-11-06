export type LinkSearchQuery = {
  /** コンテンツ種別 */
  type: "link";
  /** 検索文字列 (コース名) */
  text: string[];
  /** 配信されているLMS */
  oauthClientId: string[];
  /** リンク（リンク名）*/
  link: string[];
  /** ブック（ブック名）*/
  book: string[];
  /** トピック（トピック名）*/
  topic: string[];
};
