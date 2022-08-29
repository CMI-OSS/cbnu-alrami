import {
  useAddArticleBookmark,
  useRemoveArticleBookmark,
} from "src/api/bookmark";
import { Internet, Share, Star } from "src/components/atoms/icon";
import { toastSuccess } from "src/utils/toast";
import { isWebView } from "src/utils/webview";

import $ from "./style.module.scss";

type Props = {
  articleId: number;
  isBookmark?: boolean;
  isCouncil: boolean;
};

function Footer({ articleId, isBookmark, isCouncil }: Props) {
  const addArticleBookmark = useAddArticleBookmark();
  const removeArticleBookmark = useRemoveArticleBookmark();

  const handleCopy = () => {
    baseApp.postMessage(window.location.href);
    return toastSuccess({
      message: "공지 링크가 클립보드에 복사되었습니다.",
      style: { marginBottom: "58px" },
    });
  };

  const handleBookmark = () => {
    if (isBookmark) {
      removeArticleBookmark.mutate({ articleId });
      return;
    }
    addArticleBookmark.mutate({ articleId });
  };

  return (
    <div className={$.footer}>
      <button type="button" onClick={handleCopy}>
        <Share size={24} stroke="#C3C3C3" />
      </button>
      {!isWebView && (
        <button type="button" onClick={handleBookmark}>
          <Star
            size={27}
            stroke={isBookmark ? "#D66D6E" : "#C3C3C3"}
            fill={isBookmark ? "#D66D6E" : ""}
          />
        </button>
      )}
      {!isCouncil && <Internet size={28} stroke="#C3C3C3" />}
    </div>
  );
}

export default Footer;
