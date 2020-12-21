const validUrl = (url: string) => {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

export default validUrl;
