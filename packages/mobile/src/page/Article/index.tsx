import { Link } from "react-router-dom";

import { Setting } from "@components/atoms/icon";
import Footer from "@components/molecules/Footer";
import { useSetRecoilState } from "recoil";
import ArticleList from "src/page/Article/components/ArticleList";
import Slider from "src/page/Article/components/Slider";
import { boardOriginStatus } from "src/states";
import { getUuid } from "src/utils/storage";

import $ from "./style.module.scss";

function Article() {
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
          {isUser && (
            <Link to="/board" onClick={handleSettingClick}>
              <Setting size={20} />
            </Link>
          )}
        </div>
        <Slider />
      </div>
      <ArticleList className={$["article-list-wrap"]} />
      <Footer />
    </div>
  );
}

export default Article;
