import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { ArticleMutationResponseDto } from "@shared/swagger-api/generated/models/ArticleMutationResponseDto";
import { CreateArticleDto } from "@shared/swagger-api/generated/models/CreateArticleDto";
import { ArticleApiService } from "@shared/swagger-api/generated/services/ArticleApiService";
import { message } from "antd";
import dayjs from "dayjs";
import { useAppSelector } from "src/store";

import SubmitView, { Props as ViewProps } from "./Submit.view";

interface Props {
  isEdit?: boolean;
  articleId?: number;
  article?: Omit<CreateArticleDto, "boardId">;
  boardId?: number;
}

export default function Submit({ isEdit, articleId, article, boardId }: Props) {
  const [ messageApi, contextHolder ] = message.useMessage();

  const { title, content, images } = useAppSelector(
    (state) => state.ArticelWriteReducer,
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSuccess = (data: ArticleMutationResponseDto) => {
    if (data) {
      queryClient.invalidateQueries({ queryKey: [ "article", articleId ] });
      navigate(`/article/articles/${data.articleId}`);
    }
  };

  const onError = (error: any) => {
    messageApi.open({
      type: "error",
      content: error.body.message,
    });
  };

  const { mutate: writeArticle } = useMutation(
    [],
    ArticleApiService.articleControllerCreate,
    {
      onSuccess,
      onError,
    },
  );

  const { mutate: updateArticle } = useMutation(
    [],
    ArticleApiService.articleControllerUpdate,
    {
      onSuccess,
      onError,
    },
  );

  const viewProps: ViewProps = {
    onSubmit: async () => {
      if (!title) {
        messageApi.open({
          type: "error",
          content: "제목을 입력해주세요",
        });
        return;
      }

      if (!content) {
        messageApi.open({
          type: "error",
          content: "내용을 입력해주세요",
        });
        return;
      }

      if (isEdit && articleId && article) {
        await updateArticle({
          id: articleId,
          requestBody: {
            boardId,
            content,
            title,
            imageIds: images?.map((image) => image.id),
          },
        });
      } else if (boardId) {
        await writeArticle({
          requestBody: {
            boardId,
            content,
            title,
            imageIds: images?.map((image) => image.id),
            dateTime: dayjs().toISOString(),
          },
        });
      }
    },
  };

  return (
    <>
      {contextHolder}
      <SubmitView {...viewProps} />
    </>
  );
}
