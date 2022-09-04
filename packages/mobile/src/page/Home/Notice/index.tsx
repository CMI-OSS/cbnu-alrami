import { Link } from "react-router-dom";

import BorderBox from "@components/atoms/BorderBox";
import Line from "@components/atoms/Line";
import {
  useNewArticlesQuery,
  usePopularArticlesQuery,
} from "@hooks/api/article";
import useSearch from "@hooks/useSearch";
import classNames from "classnames";

import $ from "./style.module.scss";

const useArticles = (type: string) => {
  if (type === "popular") return usePopularArticlesQuery();
  return useNewArticlesQuery();
};

function Notice() {
  const type = useSearch({ target: "type" }) || "popular";
  const { data, isLoading, isError } = useArticles(type);
  const articles = data?.pages[0].contents.slice(0, 5);

  if (!articles) return <div>없음</div>;

  return (
    <BorderBox height={300} className={$.notice}>
      <header className={$.header}>
        공지사항
        <div className={$.categories}>
          <Link
            to="?type=popular"
            className={classNames($.category, type === "popular" && $.active)}
          >
            인기
          </Link>
          <Link
            to="?type=new"
            className={classNames($.category, type === "new" && $.active)}
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
