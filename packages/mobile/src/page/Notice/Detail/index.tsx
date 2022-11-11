import { useState } from "react";
import { useParams } from "react-router-dom";

import { LeftArrow } from "@components/atoms/icon";
import Image from "@components/atoms/Image";
import Slider from "@components/molecules/Slider";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import { useArticleQuery } from "@hooks/api/article";
import dayjs from "dayjs";
import { isWebView } from "src/utils/webview";

import Footer from "./Footer";
import $ from "./style.module.scss";

const IMAGES = [
  {
    id: 531,
    url: "https://user-images.githubusercontent.com/34129711/147549612-edea062f-1c2b-4049-bc48-49900be89826.jpg",
  },
  {
    id: 532,
    url: "https://user-images.githubusercontent.com/34129711/147549639-c30f6506-8fac-4bf2-84a5-c5de065cf26b.jpg",
  },
  {
    id: 533,
    url: "https://user-images.githubusercontent.com/34129711/176329367-b87f2b91-a955-4eca-8537-6ec44bc10b9a.jpg",
  },
  {
    id: 534,
    url: "https://user-images.githubusercontent.com/34129711/176329372-fb5d8f2f-fc97-408c-b2dd-e932e535fa66.jpg",
  },
  {
    id: 535,
    url: "https://user-images.githubusercontent.com/34129711/176329355-55837191-7c11-4f9e-8c44-75113fbfdd0c.jpg",
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
              <Slider
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
              </Slider>
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
