import { useNavigate } from "react-router-dom";

import { ResponseArticleDetailDto } from "@shared/swagger-api/generated/models/ResponseArticleDetailDto";

import $ from "./Article.module.scss";

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
  const { id, title, images, content } = article;

  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(`/board/edit/articles/${id}`);
  };

  return (
    <>
      <article className={$.article}>
        <h2 className={$.title}>{title}</h2>
        <hr className={$.hr} />

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
