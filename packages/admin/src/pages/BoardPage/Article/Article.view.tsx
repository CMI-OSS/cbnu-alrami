import $ from "./Article.module.scss";

export interface ArticleViewProps {
  title: string;
  content: string;
  images: {
    id: number;
    url: string;
  }[];
  hits: number;
  scraps: number;
  onClickImage: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => void;
}

export default function ArticleView({
  title,
  content,
  images,
  hits,
  scraps,
  onClickImage,
}: ArticleViewProps) {
  return (
    <article className={$.article}>
      <h2 className={$.title}>{title}</h2>
      <hr className={$.hr} />

      <div
        className={$.content}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      <div className={$["image-list"]}>
        {images.map((image, index) => {
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
  );
}
