import { Link } from "react-router-dom";

import BorderBox from "@components/atoms/BorderBox";
import Line from "@components/atoms/Line";
import useSearch from "@hooks/useSearch";
import classNames from "classnames";
import { useNewArticles, usePopularArticles } from "src/api/article";

import $ from "./style.module.scss";

const useArticles = (target: string) => {
  if (target === "popular") return usePopularArticles();
  return useNewArticles();
};

function Notice() {
  const target = useSearch({ target: "type" }) || "popular";
  const data = useArticles(target);
  const articles = data.data?.pages[0].slice(0, 5);

  if (!articles) return <div>없음</div>;

  return (
    <BorderBox height={300} className={$.notice}>
      <header className={$.header}>
        공지사항
        <div className={$.categories}>
          <Link
            to="?type=popular"
            className={classNames($.category, target === "popular" && $.active)}
          >
            인기
          </Link>
          <Link
            to="?type=new"
            className={classNames($.category, target === "new" && $.active)}
          >
            최신
          </Link>
        </div>
      </header>
      <Line />
      <div className={$.contents}>
        {articles.map((article) => {
          return (
            <Link to={`/notice/${article.id}`} key={article.id}>
              {article.title}
            </Link>
          );
        })}
      </div>
    </BorderBox>
  );
}

export default Notice;
