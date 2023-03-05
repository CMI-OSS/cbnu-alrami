import { useNavigate } from "react-router-dom";

import { ResponseArticleDetailDto } from "@shared/swagger-api/generated/models/ResponseArticleDetailDto";
import { Popconfirm } from "antd";
import cx from "classnames";
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
  onClickRemove: () => void;
}

export default function ArticleView({
  article,
  onClickImage,
  onClickRemove,
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
    navigate(`/article/edit/articles/${id}`);
  };

  return (
    <>
      <article className={$.article}>
        <h2 className={$.title}>{title}</h2>
        <hr className={$.hr} />
        <div className={$["sub-info"]}>
          <div>
            조회수 : {viewCount} 북마크 : {bookmarkCount} {"   "}
          </div>
          <div className={$.date}>
            작성일 : {dayjs(createdDateTime).locale("ko").format("llll")}
            <div>
              최근 수정일 : {dayjs(updatedDateTime).locale("ko").format("llll")}
            </div>
          </div>
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
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          description="삭제하면 되돌릴 수 없습니다."
          onConfirm={onClickRemove}
          okText="네"
          cancelText="아니오"
        >
          <input
            type="submit"
            value="삭제"
            className={cx($.button, $.remove)}
          />
        </Popconfirm>
      </div>
    </>
  );
}
