import { Internet, Share, Star } from "@components/atoms/icon";
import {
  useDeleteBookmarkArticleMutation,
  usePostBookmarkArticleMutation,
} from "@hooks/api/article";
import { toastSuccess } from "src/utils/toast";
import { isFromApp } from "src/utils/webview";

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

  const handleCopyClick = () => {
    if (isFromApp) {
      baseApp.postMessage(window.location.href);
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    toastSuccess({
      message: "공지 링크가 클립보드에 복사되었습니다.",
      style: { marginBottom: "58px" },
    });
  };

  return (
    <div className={$["article-footer"]}>
      <button type="button" onClick={handleCopyClick}>
        <Share size={24} stroke="#AAAAAA" />
      </button>
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
