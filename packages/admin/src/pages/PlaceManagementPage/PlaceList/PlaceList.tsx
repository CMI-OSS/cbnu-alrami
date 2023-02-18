import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { PlaceApiService } from "@shared/swagger-api/generated/services/PlaceApiService";
import PaginationView from "src/components/Pagination/Pagination.view";

import $ from "./PlaceList.module.scss";
import PlaceListView from "./PlaceList.view";

export default function PlaceList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = Number(params.get("page")) || 1;
  const navigate = useNavigate();

  const { data: schools, isLoading } = useQuery([ "places" ], () =>
    PlaceApiService.placeControllerFindSchool({ area: undefined }),
  );

  if (isLoading || !schools) return null;

  const handleClickArticle = (articleId: number) => {
    navigate(`/place/${articleId}`);
  };

  const handleClickPage = (page: number) => {
    navigate(`?page=${page}`);
  };

  const count = 7;
  const places = schools.slice((page - 1) * count, page * count) || [];

  return (
    <div className={$["article-list"]}>
      <div>건물 목록</div>
      <PlaceListView places={places} onClickPlace={handleClickArticle} />
      <PaginationView
        current={page}
        pageSize={count}
        total={schools.length}
        onChange={handleClickPage}
      />
    </div>
  );
}
