/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from "react";
import { IoImagesOutline } from "react-icons/io5";

import classNames from "classnames";

import styles from "./UploadImage.module.scss";

export interface Props {
  images: Array<string>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClickImage: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => void;
  onClickRemove: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => void;
  onClickLeft: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => void;
  onClickRight: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => void;
}

export default function UploadImageView({
  images,
  onChange,
  onClickImage,
  onClickRemove,
  onClickLeft,
  onClickRight,
}: Props) {
  const uploadRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className={styles["image-upload"]}
        onClick={() => uploadRef.current?.click()}
      >
        <span className={styles.text}>이미지 업로드 </span>
        <IoImagesOutline className={styles.icon} />
      </div>
      <input
        className={styles.hidden}
        ref={uploadRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        multiple
        onChange={onChange}
      />
      <div className={styles["image-list"]}>
        {images.map((image, index) => (
          <div className={styles["image-card"]} key={image}>
            <div
              key={image}
              style={{ backgroundImage: `url(${image})` }}
              className={styles.image}
              onClick={(e) => onClickImage(e, index)}
            />
            <div
              className={styles.remove}
              onClick={(e) => onClickRemove(e, index)}
            >
              ❌
            </div>
            <div
              className={classNames(styles.left, {
                [styles.hidden]: index === 0,
              })}
              onClick={(e) => onClickLeft(e, index)}
            >
              <div className={styles.icon}>➔</div>
            </div>

            <div
              className={classNames(styles.right, {
                [styles.hidden]: index === images.length - 1,
              })}
              onClick={(e) => onClickRight(e, index)}
            >
              <div className={styles.icon}>➔</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
