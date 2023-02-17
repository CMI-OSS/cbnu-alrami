import { Internet, Share, Star } from "@components/atoms/icon";

import $ from "./style.module.scss";

type Props = {
  isUser: boolean;
  isScraperArticle: boolean;
};

function ArticleFooter({ isUser, isScraperArticle }: Props) {
  return (
    <div className={$["article-footer"]}>
      <Share size={24} stroke="#AAAAAA" />
      {isUser && <Star size={24} stroke="#AAAAAA" />}
      {isScraperArticle && <Internet size={24} stroke="#AAAAAA" />}
    </div>
  );
}

export default ArticleFooter;
