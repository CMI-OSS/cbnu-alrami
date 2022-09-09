import { Link, useLocation } from "react-router-dom";

import classNames from "classnames";
import dayjs from "dayjs";

import $ from "./style.module.scss";

type Props = {
  id: number;
  title: string;
  date: string;
  hits: number;
  breadcrumb: string;
  scraps: number;
  type: "cmi" | "cbnu";
};

function Article({ id, title, date, hits, breadcrumb, scraps, type }: Props) {
  const { pathname } = useLocation();
  return (
    <Link to={`${pathname}/${id}`}>
      <div className={classNames($.notification, type === "cmi" && $.cmi)}>
        <span className={$.breadcrumb}>{breadcrumb}</span>
        <span className={$.title}>{title}</span>
        <div className={$.detail}>
          <span className={$.date}>{dayjs(date).format("YY-MM-DD")}</span>
          <span className={$.hits}>
            &nbsp;/&nbsp;조회수&nbsp;{hits}&nbsp;/&nbsp;
          </span>
          <span className={$.scraps}>스크랩&nbsp;{scraps}</span>
        </div>
      </div>
    </Link>
  );
}

export default Article;
