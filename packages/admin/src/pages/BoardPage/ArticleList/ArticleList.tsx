import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { getArticles } from "src/newApi/articleApi/getArticles";
import { isOutputType } from "src/newApi/types";

import PaginationView from "../../../components/Pagination/Pagination.view";
import $ from "./ArticleList.module.scss";
import ArticleListView from "./ArticleList.view";

export default function ArticleList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = Number(params.get("page")) || 1;
  const navigate = useNavigate();

  const pageSize = 2;

  const { data: articlePageOutput, isLoading } = useQuery(
    [ "articles", 30101, page, pageSize ],
    () => getArticles({ boardId: 30101, pageNo: page, pageSize }),
  );

  if (isLoading || !articlePageOutput) return null;

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

  if (!isOutputType(articlePageOutput, "GetArticlesApiOutput_Success"))
    return null;

  return (
    <div className={$["article-list"]}>
      <div>총학생회 &gt; 공지사항</div>
      <ArticleListView
        articles={articlePageOutput?.contents}
        onClickArticle={handleClickArticle}
      />
      <PaginationView
        currentPage={page}
        displayPageCount={10}
        totalPage={articlePageOutput.pagination.totalPageCount}
        onClick={handleClickPage}
        onClickNext={handleClickNext}
        onClickPrev={handleClickPrev}
      />
    </div>
  );
}
