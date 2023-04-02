import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Setting } from "@components/atoms/icon";
import Footer from "@components/molecules/Footer";
import { useSetRecoilState } from "recoil";
import ErrorFallback from "src/components/atoms/ErrorFallback";
import SuspenseFallback from "src/components/atoms/SuspenseFallback";
import AsyncBoundary from "src/components/templates/AsyncBoundary";
import ArticleList from "src/page/Article/components/ArticleList";
import Slider from "src/page/Article/components/Slider";
import { boardOriginStatus } from "src/states";
import { getUuid } from "src/utils/storage";

import $ from "./style.module.scss";

function Article() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const setBoardOrigin = useSetRecoilState(boardOriginStatus);
  const isUser = !!getUuid();

  const handleSettingClick = () => {
    setBoardOrigin("article");
  };

  return (
    <div className={$.article}>
      <div className={$.header}>
        <div className={$.title}>
          <span>공지사항</span>
          <Link to="/board" onClick={handleSettingClick}>
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
    </div>
  );
}

export default Article;
