import { Internet, Share, Star } from "@components/atoms/icon";

import $ from "./style.module.scss";

function ArticleFooter() {
  return (
    <div className={$["article-footer"]}>
      <Share size={24} stroke="#AAAAAA" />
      <Star size={24} stroke="#AAAAAA" />
      <Internet size={24} stroke="#AAAAAA" />
    </div>
  );
}

export default ArticleFooter;
