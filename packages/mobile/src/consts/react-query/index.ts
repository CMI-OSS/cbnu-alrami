export const queryKey = {
  article: (articleId: req.Article["articleId"]) => {
    return [ "article", articleId ];
  },
  boardArticles: (boardId: req.Article["boardId"]) => {
    return [ "boardArticles", boardId ];
  },
  bookmarkArticles: [ "bookmarkArticles" ],
  newArticles: [ "newArticles" ],
  popularArtucles: [ "popularArticles" ],
  boardTrees: [ "boardTrees" ],
  boardTree: [ "boardTree" ],
};
