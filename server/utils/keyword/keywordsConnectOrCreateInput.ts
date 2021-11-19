import type { KeywordPropSchema } from "$server/models/keyword";

function keywordsConnectOrCreateInput(keywords: KeywordPropSchema[]) {
  return {
    connectOrCreate: keywords.map((keyword) => ({
      where: keyword,
      create: keyword,
    })),
  };
}

export default keywordsConnectOrCreateInput;
