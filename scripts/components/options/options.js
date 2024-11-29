export const setPopularity = (medias, onSort, sens) => {
  medias.sort((a, b) => (b.likes - a.likes) * (sens === "desc" ? -1 : 1));
  onSort?.(medias);
  return medias;
};

export const setDate = (medias, onSort, sens) => {
  medias.sort(
    (a, b) =>
      (new Date(b.date).getTime() - new Date(a.date).getTime()) *
      (sens === "desc" ? -1 : 1)
  );
  onSort?.(medias);
  return medias;
};

export const setTitle = (medias, onSort, sens) => {
  medias.sort(
    (a, b) => a.title.localeCompare(b.title) * (sens === "desc" ? -1 : 1)
  );
  onSort?.(medias);
  return medias;
};
