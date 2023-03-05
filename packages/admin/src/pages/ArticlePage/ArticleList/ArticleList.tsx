import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { BoardApiService } from "@shared/swagger-api/generated/services/BoardApiService";

import PaginationView from "../../../components/Pagination/Pagination.view";
import SelectBoard from "../ArticleWrite/SelectBoard/SelectBoard";
import $ from "./ArticleList.module.scss";
import ArticleListView from "./ArticleList.view";

export default function ArticleList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = Number(params.get("page")) || 1;
  const navigate = useNavigate();
  const { boardId } = useParams();
  const notSelected = !boardId;

  const pageSize = 7;

  const { data: articlePageOutput } = useQuery(
    [ "articles", boardId, page, pageSize ],
    () =>
      BoardApiService.boardControllerFindArticlePage({
        id: Number(boardId),
        page,
        count: pageSize,
      }),
    {
      enabled: !!boardId,
    },
  );

  const handleClickArticle = (articleId: number) => {
    navigate(`/article/articles/${articleId}`);
  };

  const handleClickPage = (page: number) => {
    navigate(`?page=${page}`);
  };

  return (
    <div className={$["article-list"]}>
      <SelectBoard
        boardId={notSelected ? undefined : Number(boardId)}
        onSelectBoard={(_boardId: number) => {
          if (Number(boardId) !== _boardId) navigate(`/article/${_boardId}`);
        }}
      />
      {articlePageOutput ? (
        <>
          <ArticleListView
            articles={articlePageOutput?.articles}
            onClickArticle={handleClickArticle}
          />
          <PaginationView
            current={page}
            total={articlePageOutput.pagination.totalItemCount}
            onChange={handleClickPage}
            pageSize={pageSize}
          />
        </>
      ) : null}
    </div>
  );
}
