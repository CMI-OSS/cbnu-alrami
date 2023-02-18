import http from "src/api/core";

export const postArticleBookmark = (articleId: req.Bookmark["articleId"]) => {
  return http.post(`/bookmark/articles/${articleId}`);
};

export const deleteArticleBookmark = (articleId: req.Bookmark["articleId"]) => {
  return http.delete(`/bookmark/articles/${articleId}`);
};