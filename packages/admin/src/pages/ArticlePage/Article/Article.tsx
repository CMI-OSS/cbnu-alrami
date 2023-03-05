/* eslint-disable no-restricted-globals */
import { useQuery } from "react-query";
import { useParams } from "react-router";

import { ArticleApiService } from "@shared/swagger-api/generated/services/ArticleApiService";
import { useAppDispatch } from "src/store";

import ImagePreview from "../ArticleWrite/UploadImage/ImagePreview/ImagePreview";
import { openImagePreview } from "../ArticleWrite/UploadImage/ImagePreview/ImagePreview.store";
import ArticleView, { ArticleViewProps } from "./Article.view";

export default function Article() {
  const { articleId } = useParams();
  const dispatch = useAppDispatch();

  const { data: article } = useQuery([ "article", articleId ], () =>
    ArticleApiService.articleControllerFindOne({ id: Number(articleId) }),
  );

  if (!article) return null;

  const articleViewProps: ArticleViewProps = {
    article,
    onClickImage: (e, index) => {
      dispatch(
        openImagePreview({
          images: article.images
            ? article.images.map((image) => image.url)
            : [],
          currentIndex: index,
        }),
      );
    },
    onClickRemove: async () => {
      await ArticleApiService.articleControllerRemove({
        id: Number(articleId),
      });
      history.back();
    },
  };

  return (
    <>
      <ArticleView {...articleViewProps} />
      <ImagePreview />
    </>
  );
}
