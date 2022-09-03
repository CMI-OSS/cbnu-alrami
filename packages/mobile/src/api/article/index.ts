import http from "src/api/core";

export const fetchArticle = (
  articleId: req.Article["articleId"],
): Promise<res.Article> => {
  return http.get(`/boards/articles/${articleId}`);
};
