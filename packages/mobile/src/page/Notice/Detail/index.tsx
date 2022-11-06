import { useState } from "react";
import { useParams } from "react-router-dom";

import { LeftArrow } from "@components/atoms/icon";
import Image from "@components/atoms/Image";
import ImageSlider from "@components/molecules/ImageSlider";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import { useArticleQuery } from "@hooks/api/article";
import dayjs from "dayjs";
import { isWebView } from "src/utils/webview";

import Footer from "./Footer";
import $ from "./style.module.scss";

const IMAGES = [
  {
    id: 531,
    url: "https://cbnutest.s3.ap-northeast-2.amazonaws.com/image/1664968693862.jpeg",
  },
  {
    id: 532,
    url: "https://cbnutest.s3.ap-northeast-2.amazonaws.com/image/1664968693862.jpeg",
  },
  {
    id: 533,
    url: "https://cbnutest.s3.ap-northeast-2.amazonaws.com/image/1664968693862.jpeg",
  },
  {
    id: 534,
    url: "https://cbnutest.s3.ap-northeast-2.amazonaws.com/image/1664968693862.jpeg",
  },
  {
    id: 535,
    url: "https://cbnutest.s3.ap-northeast-2.amazonaws.com/image/1664968693862.jpeg",
  },
  {
    id: 536,
    url: "https://cbnutest.s3.ap-northeast-2.amazonaws.com/image/1664968693862.jpeg",
  },
  {
    id: 537,
    url: "https://cbnutest.s3.ap-northeast-2.amazonaws.com/image/1664968693862.jpeg",
  },
  {
    id: 538,
    url: "https://cbnutest.s3.ap-northeast-2.amazonaws.com/image/1664968693862.jpeg",
  },
  {
    id: 539,
    url: "https://cbnutest.s3.ap-northeast-2.amazonaws.com/image/1664968693862.jpeg",
  },
  {
    id: 540,
    url: "https://cbnutest.s3.ap-northeast-2.amazonaws.com/image/1664968693862.jpeg",
  },
];

function Detail() {
  const { articleId } = useParams();
  const {
    data: article,
    error,
    isLoading,
  } = useArticleQuery(Number(articleId)!);
  const [ order, setOrder ] = useState(0);

  if (!article || error || isLoading) return <></>;
  const isImageView =
    (`${article.board.id}`[0] === "3" || `${article.board.id}`[0] === "4") &&
    article.images.length !== 0;

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
          <div className={$.content}>
            {isImageView && (
              <ImageSlider
                className={$["article-image-wrapper"]}
                {...{ order, setOrder }}
                total={IMAGES.length}
              >
                {/* {article.images.map((image) => { */}
                {IMAGES.map((image) => {
                  return (
                    <Image
                      className={$["article-image"]}
                      key={image.id}
                      src={image.url}
                      alt="공지사항 이미지"
                    />
                  );
                })}
              </ImageSlider>
            )}
            <div
              className={$.article}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
        <Footer
          url={article.url}
          articleId={Number(articleId)}
          isBookmark={article?.isBookmark}
          isCouncil={String(article?.board.id)[0] === "3"}
        />
      </FullPageModalTemplate>
    </div>
  );
}

export default Detail;
