import { useCoreMutation } from "@hooks/api/core";
import { deleteArticleBookmark, postArticleBookmark } from "src/api/bookmark";
import { queryKey } from "src/consts/react-query";
import { queryClient } from "src/main";

// TODO: queryKey.bookmarkArticles invalidate
export const useAddArticleBookmarkMutation = (
  articleId: req.Bookmark["articleId"],
) => {
  return useCoreMutation(postArticleBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.article(articleId));
    },
  });
};

export const useRemoveArticleBookmarkMutation = (
  articleId: req.Bookmark["articleId"],
) => {
  return useCoreMutation(deleteArticleBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.article(articleId));
    },
  });
};
