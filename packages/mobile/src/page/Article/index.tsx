import { Link, useLocation } from "react-router-dom";

import { Setting } from "@components/atoms/icon";
import Footer from "@components/molecules/Footer";
import { useSubscribeBoardsQuery } from "@hooks/api/board";
import useSwipe from "@hooks/useSwipe";
import ErrorFallback from "src/components/atoms/ErrorFallback";
import SuspenseFallback from "src/components/atoms/SuspenseFallback";
import ReloadButton from "src/components/shared/ReloadButton";
import AsyncBoundary from "src/components/templates/AsyncBoundary";
import ArticleList from "src/page/Article/components/ArticleList";
import Slider from "src/page/Article/components/Slider";
import { useAppDispatch } from "src/store";
import { setOrigin } from "src/store/boardSlice";

import $ from "./style.module.scss";
import useReloadArticleQueries from "./useReloadArticleQueries";

function Article() {
  const dispatch = useAppDispatch();
  const hasSubscribeBoard = useSubscribeBoardsQuery().data?.length;
  const path = hasSubscribeBoard ? "/setting/board" : "/board";
  const origin = useLocation().pathname.split("/").at(-1) || "subscribe";
  const swipeRef = useSwipe();
  const reloadArticleQueries = useReloadArticleQueries();

  const handleSettingClick = () => {
    dispatch(setOrigin({ origin }));
  };

  return (
    <section className={$.article} ref={swipeRef}>
      <div className={$.header}>
        <div className={$.title}>
          <span>공지사항</span>
          <ReloadButton
            buttonType="icon"
            stroke="#5E5E5E"
            onClick={reloadArticleQueries}
            className={$["reload-button"]}
          />
          <Link
            className={$["setting-link"]}
            to={path}
            onClick={handleSettingClick}
          >
            <Setting size={20} />
          </Link>
        </div>
        <Slider />
      </div>
      <AsyncBoundary
        suspenseFallback={
          <SuspenseFallback height="calc(var(--vh, 1vh) * 100)" />
        }
        errorFallback={ErrorFallback}
        fallBackHeight="calc(var(--vh, 1vh) * 100)"
      >
        <ArticleList className={$["article-list-wrap"]} />
      </AsyncBoundary>
      <Footer />
    </section>
  );
}

export default Article;
