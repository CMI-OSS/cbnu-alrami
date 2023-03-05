/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classnames from "classnames";

import styles from "./ImagePreview.module.scss";

interface Props {
  image: string;
  enableNext: boolean;
  enablePrev: boolean;
  onClickDimmed: React.MouseEventHandler<HTMLDivElement>;
  onClickNext: React.MouseEventHandler<HTMLDivElement>;
  onClickPrev: React.MouseEventHandler<HTMLDivElement>;
}

export default function ImagePreviewView({
  image,
  enableNext,
  enablePrev,
  onClickDimmed,
  onClickNext,
  onClickPrev,
}: Props) {
  return (
    <>
      <div className={styles.dimmed} onClick={onClickDimmed} />
      <div className={styles.preview}>
        <img className={styles.image} src={image} alt="미리보기 이미지" />
      </div>
      <div
        className={classnames(styles.move, styles.next, {
          [styles.disabled]: !enableNext,
        })}
        onClick={onClickNext}
      >
        <div className={styles.icon}>➔</div>
      </div>
      <div
        className={classnames(styles.move, styles.prev, {
          [styles.disabled]: !enablePrev,
        })}
        onClick={onClickPrev}
      >
        <div className={styles.icon}>➔</div>
      </div>
    </>
  );
}
