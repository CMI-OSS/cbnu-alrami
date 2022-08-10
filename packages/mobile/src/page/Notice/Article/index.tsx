import { Link, useLocation } from "react-router-dom";

import dayjs from "dayjs";

import $ from "./style.module.scss";

type Props = {
  id: number;
  title: string;
  date: string;
  hits: number;
  breadcrumb: string;
  scraps: number;
};

function Article({ id, title, date, hits, breadcrumb, scraps }: Props) {
  const { pathname } = useLocation();
  return (
    <Link to={`${pathname}/${id}`}>
      <div className={$.notification}>
        <span className={$.breadcrumb}>{breadcrumb}</span>
        <span className={$.title}>{title}</span>
        <div className={$.detail}>
          <span className={$.date}>
            {dayjs(date).format("YY-MM-DD")}&nbsp;/&nbsp;
          </span>
          <span>조회수&nbsp;{hits}&nbsp;/&nbsp;</span>
          <span>스크랩&nbsp;{scraps}</span>
        </div>
      </div>
    </Link>
  );
}

export default Article;
