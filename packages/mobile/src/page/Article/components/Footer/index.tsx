import { Internet, Share, Star } from "@components/atoms/icon";
import {
  useDeleteBookmarkArticleMutation,
  usePostBookmarkArticleMutation,
} from "@hooks/api/article1";

import $ from "./style.module.scss";

type Props = {
  articleId: number;
  isBookmark: boolean;
  isUser: boolean;
  isScraperArticle: boolean;
};

function ArticleFooter({
  articleId,
  isBookmark,
  isUser,
  isScraperArticle,
}: Props) {
  const postBookmark = usePostBookmarkArticleMutation({ id: articleId });
  const deleteBookmark = useDeleteBookmarkArticleMutation({ id: articleId });

  const toggleBookmark = () => {
    if (isBookmark) {
      deleteBookmark.mutate({ id: articleId, uuid: "1111" });
      return;
    }
    postBookmark.mutate({ id: articleId, uuid: "1111" });
  };

  return (
    <div className={$["article-footer"]}>
      <Share size={24} stroke="#AAAAAA" />
      {isUser && (
        <button type="button" onClick={toggleBookmark}>
          <Star
            size={24}
            stroke={isBookmark ? "#D66D6E" : "#AAAAAA"}
            fill={isBookmark ? "#D66D6E" : ""}
          />
        </button>
      )}
      {isScraperArticle && <Internet size={24} stroke="#AAAAAA" />}
    </div>
  );
}

export default ArticleFooter;
