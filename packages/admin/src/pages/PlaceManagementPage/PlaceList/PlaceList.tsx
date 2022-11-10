import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

import PaginationView from "src/components/Pagination/Pagination.view";
import { getPlaces } from "src/newApi/placeApi/getPlaces";
import { isOutputType } from "src/newApi/types";

import $ from "./PlaceList.module.scss";
import PlaceListView from "./PlaceList.view";

export default function PlaceList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = Number(params.get("page")) || 1;
  const navigate = useNavigate();

  const { data: placePageOutput, isLoading } = useQuery([ "places" ], () =>
    getPlaces(),
  );

  if (isLoading || !placePageOutput) return null;

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

  if (!isOutputType(placePageOutput, "GetPlacesApiOutput_Success")) return null;

  const count = 7;
  const places =
    placePageOutput?.content.slice((page - 1) * count, page * count) || [];
  const totalPage = Math.ceil(placePageOutput.content.length / count) || 0;

  return (
    <div className={$["article-list"]}>
      <div>건물 목록</div>
      <PlaceListView places={places} onClickPlace={handleClickArticle} />
      <PaginationView
        currentPage={page}
        displayPageCount={count}
        totalPage={totalPage}
        onClick={handleClickPage}
        onClickNext={handleClickNext}
        onClickPrev={handleClickPrev}
      />
    </div>
  );
}
