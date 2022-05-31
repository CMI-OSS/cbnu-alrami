import { ImagePlus } from "@components/atoms/icon/ImagePlus";

import $ from "./style.module.scss";

type detailImageType = {
  id: number;
  src: string;
  alt: string;
};
type Props = {
  isMoreContents: boolean;
  detailImageList: detailImageType[];
};

function ImageList({ isMoreContents, detailImageList }: Props) {
  return (
    <ul className={$["menu-list"]}>
      {detailImageList.map((item, index) => {
        return (
          <>
            <li key={`key-${index}`} className={$["menu-item"]}>
              <img className={$["menu-image"]} src={item.src} alt={item.alt} />
              {isMoreContents && index === 2 && (
                <div className={$["more-status"]}>
                  <ImagePlus className={$["more-plus"]} />
                  <span className={$["more-text"]}>더보기</span>
                </div>
              )}
            </li>
          </>
        );
      })}
    </ul>
  );
}

export default ImageList;
