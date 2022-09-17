import { useNavigate } from "react-router-dom";

import {
  useUpdateArticleMutation,
  useWriteArticleMutation,
} from "src/api/board";
import { useAppSelector } from "src/store";

import SubmitView, { Props as ViewProps } from "./Submit.view";

interface Props {
  isEdit?: boolean;
  articleId?: number;
}

export default function Submit({ isEdit, articleId }: Props) {
  const { title, content, images } = useAppSelector(
    (state) => state.ArticelWriteReducer,
  );
  const [ writeArticle ] = useWriteArticleMutation();
  const [ updateArticle ] = useUpdateArticleMutation();

  const navigate = useNavigate();

  const viewProps: ViewProps = {
    onSubmit: async () => {
      if (isEdit && articleId) {
        const res = await updateArticle({
          articleId,
          title,
          content,
          images: images.map((image) => String(image.id)),
        });
      }

      // const res = await writeArticle({
      //   title,
      //   content,
      //   images: images.map((image) => String(image.id)),
      //   boardId: 30101,
      // });
      // const articleId = (res as { data: number }).data;
      // navigate(`/board/articles/${articleId}`);
    },
  };

  return <SubmitView {...viewProps} />;
}
