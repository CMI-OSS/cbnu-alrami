import { useWriteArticleMutation } from "src/api/board";
import { useAppSelector } from "src/store";

import SubmitView, { Props as ViewProps } from "./Submit.view";

export default function Submit() {
  const { title, content, images } = useAppSelector(
    (state) => state.ArticelWriteReducer,
  );
  const [ writeArticle, { isLoading, isSuccess } ] = useWriteArticleMutation();

  const viewProps: ViewProps = {
    onSubmit: () => {
      writeArticle({
        title,
        content,
        images: images.map((image) => String(image.id)),
        boardId: 30101,
      });
    },
  };

  return <SubmitView {...viewProps} />;
}
