import { Link } from "react-router-dom";

import Footer from "@components/molecules/Footer";
import { Setting } from "src/components/atoms/icon";
import Category from "src/page/Notice/Category";

import ArticleList from "./ArticleList";
import $ from "./style.module.scss";

function Notice() {
  return (
    <section className={$.notice}>
      <div className={$["header-wrapper"]}>
        <header className={$.header}>
          <span>공지사항</span>
          <Link to="/subscription/setting">
            <Setting size={20} stroke="#aaa" />
          </Link>
        </header>
        <Category />
      </div>
      <div className={$["notification-list-wrapper"]}>
        <ArticleList />
      </div>
      <Footer />
    </section>
  );
}

export default Notice;
