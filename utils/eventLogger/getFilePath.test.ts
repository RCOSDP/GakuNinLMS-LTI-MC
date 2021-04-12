import getFilePath from "./getFilePath";

test("YouTube Video IDが得られる", () => {
  expect(
    getFilePath({
      providerUrl: "https://www.youtube.com/",
      url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    })
  ).toBe("aqz-KE-bpKQ");
});

test("Vimeo Video IDが得られる", () => {
  expect(
    getFilePath({
      providerUrl: "https://vimeo.com/",
      url: "https://vimeo.com/253989945",
    })
  ).toBe("253989945");
});

test("Wowzaのファイルパスが得られる", () => {
  expect(
    getFilePath({
      providerUrl: "https://example/",
      url: "https://example/api/v2/wowza/sample.mp4",
    })
  ).toBe("sample.mp4");
});

test("YouTube Video IDの取得失敗", () => {
  expect(
    getFilePath({
      providerUrl: "https://www.youtube.com/",
      url: "https://www.youtube.com/",
    })
  ).toBe(undefined);
});

test("URLが空", () => {
  expect(
    getFilePath({
      providerUrl: "https://vimeo.com/",
      url: "",
    })
  ).toBe(undefined);
});
