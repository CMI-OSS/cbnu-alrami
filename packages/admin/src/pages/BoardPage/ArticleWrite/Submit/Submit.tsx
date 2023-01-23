import { useNavigate } from "react-router-dom";

import {
  ArticleResponse,
  useUpdateArticleMutation,
  useWriteArticleMutation,
} from "src/api/board";
import { useAppSelector } from "src/store";

import SubmitView, { Props as ViewProps } from "./Submit.view";

interface Props {
  isEdit?: boolean;
  articleId?: number;
  article?: ArticleResponse;
}

export default function Submit({ isEdit, articleId, article }: Props) {
  const { title, content, images } = useAppSelector(
    (state) => state.ArticelWriteReducer,
  );
  const [ writeArticle ] = useWriteArticleMutation();
  const [ updateArticle ] = useUpdateArticleMutation();

  const navigate = useNavigate();

  const viewProps: ViewProps = {
    onSubmit: async () => {
      if (isEdit && articleId && article) {
        console.log(article);
        const res = await updateArticle({
          articleId,
          article: {
            boardId: article.board.id,
            date: article.date,
            url: article.url,
            content,
            images: images.map((image) => String(image.id)),
            title,
          },
        });

        navigate(`/board/articles/${articleId}`);
      } else {
        const res = await writeArticle({
          title,
          content,
          images: images.map((image) => String(image.id)),
          boardId: 30101,
        });
        const articleId = (res as { data: number }).data;
        navigate(`/board/articles/${articleId}`);
      }
    },
  };

  return <SubmitView {...viewProps} />;
}
