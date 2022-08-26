import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { Close, LeftArrow, LongArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import dayjs from "dayjs";
import { useArticle } from "src/api/article";
import { isWebView } from "src/utils/webview";

import Footer from "./Footer";
import $ from "./style.module.scss";

function Detail() {
  const { articleId } = useParams();
  const { isLoading, error, data } = useArticle(Number(articleId));

  useEffect(() => {
    toast.dismiss();
    toast.custom(
      <div className={$.toast}>
        <div className={$.download}>
          충림이 앱으로 보기
          <LongArrow size={6} stroke="#fff" style={{ marginLeft: "8px" }} />
        </div>
        <button type="button">
          <Close size={10} stroke="#fff" />
        </button>
      </div>,
      {
        duration: Infinity,
      },
    );
  }, []);

  if (!data || error || isLoading) return <></>;
  const article = data.data;
  return (
    <div className={$["notice-detail"]}>
      <FullPageModalTemplate
        left={isWebView ? <></> : <LeftArrow size={16} stroke="#AAAAAA" />}
        title={article.board.name}
      >
        <div className={$.children}>
          <div className={$.header}>
            <h1 className={$.title}>{article.title}</h1>
            <div className={$.detail}>
              <span>{dayjs(article.date).format("YY-MM-DD")}&nbsp;/&nbsp;</span>
              <span>조회수&nbsp;{article.hits}&nbsp;/&nbsp;</span>
              <span>스크랩&nbsp;{article.scraps}</span>
            </div>
          </div>
          <div
            className={$.content}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
        <Footer
          articleId={Number(articleId)}
          isBookmark={article?.isBookmark}
          isCouncil={String(article?.board.id)[0] === "3"}
        />
      </FullPageModalTemplate>
    </div>
  );
}

export default Detail;
