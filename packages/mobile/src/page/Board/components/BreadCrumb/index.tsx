import { useLocation } from "react-router-dom";

import { useBreadcrumbQuery } from "@hooks/api/board";

import $ from "./style.module.scss";

function BreadCrumb() {
  const { pathname } = useLocation();
  const boardIds = pathname
    .split("/")
    .slice(2)
    .map((boardId) => {
      return Number(boardId);
    });
  const results = useBreadcrumbQuery(boardIds);
  const datas = results.map((result) => {
    return result.data?.name;
  });
  const breadcrumb =
    datas.length !== 0 ? `전체 > ${datas.join(" > ")}` : "전체";
  return <div className={$.breadcrumb}>{breadcrumb}</div>;
}

export default BreadCrumb;
