import extractNumberFromPx from "$utils/extractNumberFromPx";

/**
 * 単位(px)付きの値を合算する
 * @params 単位(px)付きの値
 * @returns 合算した単位(px)付きの値
 */
function sumPixels(...valuesWithPx: string[]) {
  const values = valuesWithPx.map((valueWithPx) =>
    extractNumberFromPx(valueWithPx)
  );
  return `${values.reduce((a, b) => a + b)}px`;
}

export default sumPixels;
