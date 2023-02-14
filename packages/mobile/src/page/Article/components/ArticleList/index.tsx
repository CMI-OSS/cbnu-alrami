import ArticleItem from "src/page/Article/components/ArticleItem";

import $ from "./style.module.scss";

function ArticleList() {
  return (
    <div className={$["article-list"]}>
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
    </div>
  );
}

export default ArticleList;
