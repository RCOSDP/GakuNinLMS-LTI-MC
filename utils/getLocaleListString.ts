function getLocaleListString(strings: string[], _: string | string[]): string {
  const separator = "、";
  return strings.join(separator);
}
export default getLocaleListString;
