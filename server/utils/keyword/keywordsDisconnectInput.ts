import type { KeywordPropSchema, KeywordSchema } from "$server/models/keyword";

function keywordsDisconnectInput(a: KeywordSchema[], b: KeywordPropSchema[]) {
  const keywords = a.filter(
    (keyword) => !b.some(({ name }) => name === keyword.name)
  );
  return {
    disconnect: keywords.map(({ id }) => ({
      id,
    })),
  };
}

export default keywordsDisconnectInput;
