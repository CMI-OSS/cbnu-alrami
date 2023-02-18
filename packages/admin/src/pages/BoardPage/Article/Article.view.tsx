import { useNavigate } from "react-router-dom";

import { ResponseArticleDetailDto } from "@shared/swagger-api/generated/models/ResponseArticleDetailDto";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "dayjs/locale/ko";

import "react-quill/dist/quill.snow.css";
import $ from "./Article.module.scss";

dayjs.extend(localizedFormat);

export interface ArticleViewProps {
  article: ResponseArticleDetailDto;
  onClickImage: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => void;
}

export default function ArticleView({
  article,
  onClickImage,
}: ArticleViewProps) {
  const {
    id,
    title,
    images,
    content,
    bookmarkCount,
    viewCount,
    createdDateTime,
    updatedDateTime,
  } = article;

  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(`/board/edit/articles/${id}`);
  };

  return (
    <>
      <article className={$.article}>
        <h2 className={$.title}>{title}</h2>
        <hr className={$.hr} />
        <div>
          <span>
            조회수 : {viewCount} 북마크 : {bookmarkCount} {"   "} 작성일 :{" "}
            {dayjs(createdDateTime).locale("ko").format("llll")} 최근 수정일 :{" "}
            {dayjs(updatedDateTime).locale("ko").format("llll")}
          </span>
        </div>

        <div
          className={$.content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        <div className={$["image-list"]}>
          {images?.map((image, index) => {
            return (
              <div className={$["image-card"]}>
                <div
                  key={image.id}
                  className={$.image}
                  style={{ backgroundImage: `url(${image.url})` }}
                  onClick={(e) => onClickImage(e, index)}
                />
              </div>
            );
          })}
        </div>
      </article>
      <div style={{ textAlign: "center" }}>
        <input
          type="submit"
          value="수정"
          className={$.button}
          onClick={handleClickEdit}
        />
      </div>
    </>
  );
}
