import { useLocation, useParams } from "react-router-dom";

import { useGetArticleQuery } from "src/api/board";
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

  const { data: article } = useGetArticleQuery(
    { articleId: Number(articleId) },
    {
      skip: !isEdit,
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
