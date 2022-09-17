import { useLocation, useNavigate } from "react-router-dom";

import { useGetArticlePageQuery } from "src/api/article";

import $ from "./ArticleList.module.scss";
import ArticleListView from "./ArticleList.view";
import PaginationView from "./Pagination/Pagination.view";

export default function ArticleList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = Number(params.get("page")) || 1;
  const navigate = useNavigate();

  const { data: articlePage, isLoading } = useGetArticlePageQuery({
    page: Number(page),
    boardId: 30101,
    pageSize: 10,
  });

  if (isLoading || !articlePage) return null;

  const handleClickArticle = (articleId: number) => {
    navigate(`/board/articles/${articleId}`);
  };

  const handleClickPage = (page: number) => {
    navigate(`?page=${page}`);
  };

  return (
    <div className={$["article-list"]}>
      <div>총학생회 &gt; 공지사항</div>
      <ArticleListView
        articles={articlePage?.contents}
        onClickArticle={handleClickArticle}
      />
      <PaginationView currentPage={page} onClick={handleClickPage} />
    </div>
  );
}
