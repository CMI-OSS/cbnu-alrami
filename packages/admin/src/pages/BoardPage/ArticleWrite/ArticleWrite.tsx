import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";

import { ArticleApiService } from "@shared/swagger-api/generated/services/ArticleApiService";
import { useAppDispatch } from "src/store";

import styles from "./ArticleWrite.module.scss";
import { init } from "./ArticleWrite.store";
import SelectBoard from "./SelectBoard/SelectBoard";
import Submit from "./Submit/Submit";
import UploadImage from "./UploadImage/UploadImage";
import WriteContent from "./WriteContent/WriteContent";
import WriteTitle from "./WriteTitle/WriteTitle";

export default function ArticleWrite() {
  const location = useLocation();
  const params = useParams();
  const dispatch = useAppDispatch();

  const isEdit = location.pathname.includes("edit");
  const { articleId } = params;

  if (isEdit && !articleId) return null;

  const { data: article } = useQuery(
    [ "article", articleId ],
    () => ArticleApiService.articleControllerFindOne({ id: Number(articleId) }),
    {
      enabled: isEdit,
    },
  );

  if (article) {
    dispatch(init(article));
  }

  return (
    <div className={styles.wrapper}>
      <WriteTitle />
      <br />
      <SelectBoard />
      <WriteContent />
      <UploadImage />
      <Submit isEdit={isEdit} articleId={Number(articleId)} article={article} />
    </div>
  );
}
