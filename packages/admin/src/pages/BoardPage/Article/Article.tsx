import { useParams } from "react-router";

import { useGetArticleQuery } from "src/api/board";
import { useAppDispatch } from "src/store";

import ImagePreview from "../ArticleWrite/UploadImage/ImagePreview/ImagePreview";
import { openImagePreview } from "../ArticleWrite/UploadImage/ImagePreview/ImagePreview.store";
import ArticleView, { ArticleViewProps } from "./Article.view";

export default function Article() {
  const { articleId } = useParams();
  const dispatch = useAppDispatch();
  const { data } = useGetArticleQuery(
    {
      articleId: Number(articleId),
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  if (!data) return null;

  const articleViewProps: ArticleViewProps = {
    ...data,
    onClickImage: (e, index) => {
      dispatch(
        openImagePreview({
          images: data.images.map((image) => image.url),
          currentIndex: index,
        }),
      );
    },
  };

  return (
    <>
      <ArticleView {...articleViewProps} />
      <ImagePreview />
    </>
  );
}
