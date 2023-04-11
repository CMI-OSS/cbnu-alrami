import { queryKey } from "src/consts/react-query/queryKey";
import { queryClient } from "src/main";

function reloadArticleQueries() {
  const typeOfArticle = window.location.pathname.split("/").pop();
  if (!typeOfArticle) return;

  if (typeOfArticle === "popular") {
    queryClient.resetQueries(queryKey.popularArticles());
    return;
  }
  if (typeOfArticle === "subscribe") {
    queryClient.resetQueries(queryKey.subscribeArticles());
    return;
  }
  if (typeOfArticle === "bookmark") {
    queryClient.resetQueries(queryKey.bookmarkArticles());
    return;
  }
  queryClient.resetQueries(
    queryKey.boardArticles({ id: parseInt(typeOfArticle, 10) }),
  );
}

export default reloadArticleQueries;
