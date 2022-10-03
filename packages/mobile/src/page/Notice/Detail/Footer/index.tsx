import { isMobile } from "react-device-detect";

import {
  useAddArticleBookmarkMutation,
  useRemoveArticleBookmarkMutation,
} from "@hooks/api/bookmark";
import { Internet, Share, Star } from "src/components/atoms/icon";
import { toastSuccess } from "src/utils/toast";
import { isFromApp, isWebView } from "src/utils/webview";

import $ from "./style.module.scss";

type Props = {
  url: string;
  articleId: number;
  isBookmark?: boolean;
  isCouncil: boolean;
};

function Footer({ url, articleId, isBookmark, isCouncil }: Props) {
  const addArticleBookmark = useAddArticleBookmarkMutation(articleId);
  const removeArticleBookmark = useRemoveArticleBookmarkMutation(articleId);

  const handleCopy = async () => {
    if (isFromApp) {
      baseApp.postMessage(window.location.href);
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
    return toastSuccess({
      message: "공지사항 링크가 클립보드에 복사되었습니다.",
      style: { marginBottom: "58px" },
    });
  };

  const handleBookmark = () => {
    if (isBookmark) {
      removeArticleBookmark.mutate(articleId);
      return;
    }
    addArticleBookmark.mutate(articleId);
  };

  // TODO: 백엔드 res 확인 후 url 삭제
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
      {!isCouncil && (
        <a target="_blank" href={url || "http://naver.com"} rel="noreferrer">
          <Internet size={28} stroke="#C3C3C3" />
        </a>
      )}
    </div>
  );
}

export default Footer;
