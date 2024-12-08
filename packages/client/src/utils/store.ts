export const store = {
  get: (key: string): string | null => {
    const search = new URLSearchParams(location.search);
    return search.get(key) ?? localStorage.getItem(key);
  },
  set: (key: string, value: unknown, opts: { writeToUrl?: boolean} = {}) => {
    const stringValue = `${value}`;
    localStorage.setItem(key, stringValue);

    if (opts.writeToUrl) {
      const url = new URL(location.href);
      url.searchParams.set(key, stringValue);
      history.replaceState(null, "", url.href);
    }
  }
};
