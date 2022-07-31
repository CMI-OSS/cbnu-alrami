import { Link, useLocation } from "react-router-dom";

import dayjs from "dayjs";

import $ from "./style.module.scss";

type Props = {
  notification: {
    id: number;
    title: string;
    dates: string;
    hits: number;
    breadcrumb: string;
    scraps: number;
  };
};

function Notification({ notification }: Props) {
  const { id, breadcrumb, title, dates, hits, scraps } = notification;
  const { pathname } = useLocation();
  return (
    <Link to={`${pathname}/${id}`} key={id}>
      <div className={$.notification}>
        <div className={$.breadcrumb}>{breadcrumb}</div>
        <div className={$.title}>{title}</div>
        <div className={$.detail}>
          <div className={$.dates}>
            {dayjs(dates).format("YY-MM-DD")}&nbsp;/&nbsp;
          </div>
          <div className={$.hits}>조회수&nbsp;{hits}&nbsp;/&nbsp;</div>
          <div className={$.scraps}>스크랩&nbsp;{scraps}</div>
        </div>
      </div>
    </Link>
  );
}

export default Notification;
