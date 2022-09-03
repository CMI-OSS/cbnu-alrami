import { useCoreQuery } from "@hooks/api/core";
import { fetchArticle } from "src/api/article/index";
import { queryKey } from "src/consts/react-query";

export const useArticleQuery = (articleId: req.Article["articleId"]) => {
  return useCoreQuery(queryKey.article(articleId), () => {
    return fetchArticle(articleId);
  });
};
