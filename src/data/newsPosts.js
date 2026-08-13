const newsModules = import.meta.glob('./news/*.json', {
  eager: true,
  import: 'default',
});

export const newsPosts = Object.values(newsModules);
