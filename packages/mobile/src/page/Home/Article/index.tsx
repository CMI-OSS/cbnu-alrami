import { useState } from "react";
import { Link } from "react-router-dom";

import Line from "@components/atoms/Line";
import {
  usePopularArticlesQuery,
  useSubscribeArticlesQuery,
} from "@hooks/api/article";
import classNames from "classnames";
import { setRecentBoardId } from "src/utils/storage";

import $ from "./style.module.scss";

type Props = {
  kind: "popular" | "subscribe";
  setKind: (value: Props["kind"]) => void;
};

const useArticles = (kind: Props["kind"]) => {
  if (kind === "popular") {
    return usePopularArticlesQuery({ count: 5 });
  }
  return useSubscribeArticlesQuery({ count: 5 });
};

function ArticleHeader({ kind, setKind }: Props) {
  return (
    <div className={$.header}>
      <span>공지사항</span>
      <div className={$["button-wrapper"]}>
        <button
          type="button"
          onClick={() => {
            return setKind("popular");
          }}
          className={classNames($.popular, kind === "popular" && $.active)}
        >
          인기
        </button>
        <button
          type="button"
          onClick={() => {
            return setKind("subscribe");
          }}
          className={classNames($.subscribe, kind === "subscribe" && $.active)}
        >
          최신
        </button>
      </div>
    </div>
  );
}

function Article() {
  const [ kind, setKind ] = useState<Props["kind"]>("popular");
  const { data: articlesData } = useArticles(kind);

  if (articlesData && !articlesData?.pages[0]?.articles?.length) {
    return (
      <div className={$.container}>
        <ArticleHeader {...{ kind, setKind }} />
        <Line />
        <div className={$.empty}>공지사항이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={$.container}>
      <ArticleHeader {...{ kind, setKind }} />
      <Line />
      <div className={$.content}>
        {articlesData?.pages[0]?.articles.map((articleData) => {
          const { title, id } = articleData;
          return (
            <div className={$.title} key={id}>
              <Link
                to={`/article/detail/${id}`}
                onClick={() => {
                  return setRecentBoardId(articleData.board.id);
                }}
              >
                {title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Article;
