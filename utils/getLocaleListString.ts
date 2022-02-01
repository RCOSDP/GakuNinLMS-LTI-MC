function getLocaleListString(
  strings: string[],
  locales: string | string[]
): string {
  const formatter = new Intl.ListFormat(locales, {
    type: "conjunction",
    style: "long",
  });
  return formatter.format(strings);
}
export default getLocaleListString;
