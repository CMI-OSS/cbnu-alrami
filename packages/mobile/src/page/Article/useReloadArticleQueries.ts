import { useLocation } from "react-router-dom";

import { queryKey } from "src/consts/react-query/queryKey";
import { queryClient } from "src/main";

function useReloadArticleQueries() {
  const location = useLocation();

  const reloadArticleQueries = () => {
    const kind = location.pathname.split("/").pop();
    if (!kind) return;

    if (kind === "popular") {
      queryClient.resetQueries(queryKey.popularArticles());
      return;
    }
    if (kind === "subscribe") {
      queryClient.resetQueries(queryKey.subscribeArticles());
      return;
    }
    if (kind === "bookmark") {
      queryClient.resetQueries(queryKey.bookmarkArticles());
      return;
    }
    queryClient.resetQueries(
      queryKey.boardArticles({ id: parseInt(kind, 10) }),
    );
  };

  return reloadArticleQueries;
}

export default useReloadArticleQueries;
