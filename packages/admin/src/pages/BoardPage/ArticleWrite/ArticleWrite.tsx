import styles from "./ArticleWrite.module.scss";
import SelectBoard from "./SelectBoard/SelectBoard";
import Submit from "./Submit/Submit";
import UploadImage from "./UploadImage/UploadImage";
import WriteContent from "./WriteContent/WriteContent";
import WriteTitle from "./WriteTitle/WriteTitle";

export default function ArticleWrite() {
  return (
    <div className={styles.wrapper}>
      <WriteTitle />
      <br />
      <SelectBoard />
      <WriteContent />
      <UploadImage />
      <Submit />
    </div>
  );
}
