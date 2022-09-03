export const queryKey = {
  article: (articleId: req.Article["articleId"]) => {
    return [ "article", articleId ];
  },
};
