import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { AdminApiService } from "@shared/swagger-api/generated/services/AdminApiService";
import PaginationView from "src/components/Pagination/Pagination.view";

import $ from "./AdminList.module.scss";
import AdminListView from "./AdminList.view";

export default function AdminList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = Number(params.get("page")) || 1;
  const navigate = useNavigate();

  const { data, isLoading } = useQuery([ "admins" ], () =>
    AdminApiService.adminControllerFindAll(),
  );

  if (isLoading || !data) return null;

  const handleClickAdmin = (adminId: number) => {
    navigate(`/admin/${adminId}`);
  };

  const handleClickPage = (page: number) => {
    navigate(`?page=${page}`);
  };

  const count = 7;
  const admins = data.slice((page - 1) * count, page * count) || [];

  return (
    <div className={$["article-list"]}>
      <div>관리자 목록</div>
      <AdminListView admins={admins} onClickPlace={handleClickAdmin} />
      <PaginationView
        current={page}
        pageSize={count}
        total={data.length}
        onChange={handleClickPage}
      />
    </div>
  );
}
