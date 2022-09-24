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
  const pageSize = 2;

  const { data: articlePage, isLoading } = useGetArticlePageQuery({
    page: Number(page),
    boardId: 30101,
    pageSize,
  });

  if (isLoading || !articlePage) return null;

  const handleClickArticle = (articleId: number) => {
    navigate(`/board/articles/${articleId}`);
  };

  const handleClickPage = (page: number) => {
    navigate(`?page=${page}`);
  };

  const handleClickPrev = () => {
    navigate(`?page=${page - 1}`);
  };

  const handleClickNext = () => {
    navigate(`?page=${page + 1}`);
  };

  return (
    <div className={$["article-list"]}>
      <div>총학생회 &gt; 공지사항</div>
      <ArticleListView
        articles={articlePage?.contents}
        onClickArticle={handleClickArticle}
      />
      <PaginationView
        currentPage={page}
        displayPageCount={10}
        totalPage={articlePage.pagination.totalPageCount}
        onClick={handleClickPage}
        onClickNext={handleClickNext}
        onClickPrev={handleClickPrev}
      />
    </div>
  );
}
