import { Internet, Star } from "@components/atoms/icon";
import {
  useDeleteBookmarkArticleMutation,
  usePostBookmarkArticleMutation,
} from "@hooks/api/article";
import ShareButton from "src/components/atoms/ShareButton";

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
  const deleteBookmark = useDeleteBookmarkArticleMutation({
    id: articleId,
  });

  const toggleBookmark = () => {
    if (isBookmark) {
      deleteBookmark.mutate({ id: articleId });
      return;
    }
    postBookmark.mutate({ id: articleId });
  };

  return (
    <div className={$["article-footer"]}>
      <ShareButton
        size={24}
        stroke="#AAAAAA"
        successMsg="공지 링크가 클립보드에 복사되었습니다."
      />
      {isUser && (
        <button type="button" onClick={toggleBookmark}>
          <Star
            size={24}
            stroke={isBookmark ? "#D66D6E" : "#AAAAAA"}
            fill={isBookmark ? "#D66D6E" : ""}
          />
        </button>
      )}
      {isScraperArticle && (
        // TODO: 네이티브 로직 필요
        <Internet size={24} stroke="#AAAAAA" />
      )}
    </div>
  );
}

export default ArticleFooter;
