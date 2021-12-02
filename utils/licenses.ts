const licenses: {
  [key: string]: { button: string; url: string; name: string };
} = {
  "CC-BY-4.0": {
    button: "https://i.creativecommons.org/l/by/4.0/88x31.png",
    url: "https://creativecommons.org/licenses/by/4.0/",
    name: "クリエイティブ・コモンズ 表示 4.0 国際 ライセンス",
  },
  "CC-BY-NC-4.0": {
    button: "https://i.creativecommons.org/l/by-nc/4.0/88x31.png",
    url: "https://creativecommons.org/licenses/by-nc/4.0/",
    name: "クリエイティブ・コモンズ 表示 - 非営利 4.0 国際 ライセンス",
  },
  "CC-BY-NC-ND-4.0": {
    button: "https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png",
    url: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    name: "クリエイティブ・コモンズ 表示 - 非営利 - 改変禁止 4.0 国際 ライセンス",
  },
  "CC-BY-NC-SA-4.0": {
    button: "https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    name: "クリエイティブ・コモンズ 表示 - 非営利 - 継承 4.0 国際 ライセンス",
  },
  "CC-BY-ND-4.0": {
    button: "https://i.creativecommons.org/l/by-nd/4.0/88x31.png",
    url: "https://creativecommons.org/licenses/by-nd/4.0/",
    name: "クリエイティブ・コモンズ 表示 - 改変禁止 4.0 国際 ライセンス",
  },
  "CC-BY-SA-4.0": {
    button: "https://i.creativecommons.org/l/by-sa/4.0/88x31.png",
    url: "https://creativecommons.org/licenses/by-sa/4.0/",
    name: "クリエイティブ・コモンズ 表示 - 継承 4.0 国際 ライセンス",
  },
} as const;

export default licenses;
