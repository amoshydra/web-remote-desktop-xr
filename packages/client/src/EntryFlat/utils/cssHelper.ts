export const classNames = (...names: (string | undefined)[]) => {
  return names
    .map(x => x?.trim())
    .filter(Boolean)
    .join(" ")
  ;
};
