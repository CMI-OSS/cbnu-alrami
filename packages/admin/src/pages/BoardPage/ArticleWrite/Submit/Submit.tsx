import { useNavigate } from "react-router-dom";

import { useWriteArticleMutation } from "src/api/board";
import { useAppSelector } from "src/store";

import SubmitView, { Props as ViewProps } from "./Submit.view";

export default function Submit() {
  const { title, content, images } = useAppSelector(
    (state) => state.ArticelWriteReducer,
  );
  const [ writeArticle, { isLoading, isSuccess } ] = useWriteArticleMutation();

  const navigate = useNavigate();

  const viewProps: ViewProps = {
    onSubmit: async () => {
      const res = await writeArticle({
        title,
        content,
        images: images.map((image) => String(image.id)),
        boardId: 30101,
      });
      const articleId = (res as { data: number }).data;
      navigate(`/board/articles/${articleId}`);
    },
  };

  return <SubmitView {...viewProps} />;
}
