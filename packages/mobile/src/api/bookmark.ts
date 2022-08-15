import { useMutation } from "react-query";

import { queryClient } from "src/main";

import caxios from "./caxios";

const postArticleBookmark = (articleId: number) => {
  return caxios.post(`/bookmark/articles/${articleId}`);
};

export const useAddArticleBookmark = () => {
  return useMutation(
    ({ articleId }: { articleId: number }) => {
      return postArticleBookmark(articleId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ "article" ]);
      },
    },
  );
};

const deleteArticleBookmark = (articleId: number) => {
  return caxios.delete(`/bookmark/articles/${articleId}`);
};

export const useRemoveArticleBookmark = () => {
  return useMutation(
    ({ articleId }: { articleId: number }) => {
      return deleteArticleBookmark(articleId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ "article" ]);
      },
    },
  );
};
