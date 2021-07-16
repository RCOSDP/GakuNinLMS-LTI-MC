const getValidUrl = (url: string) => {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

export default getValidUrl;
