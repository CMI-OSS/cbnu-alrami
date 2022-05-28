import { ImagePlus } from "@components/atoms/icon/ImagePlus";

import $ from "./style.module.scss";

type Props = {
  isMoreContents: boolean;
};

function ImageList({ isMoreContents }: Props) {
  return (
    <ul className={$.menuList}>
      <li className={$.menuItem}>
        <img
          className={$.menuImage}
          src="https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180130_263%2F1517301583613dwuaL_JPEG%2FZh5SeEjUT12rWxcLJ2nstPaB.jpg"
          alt="감바스"
        />
      </li>
      <li className={$.menuItem}>
        <img
          className={$.menuImage}
          src="https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180130_263%2F1517301583613dwuaL_JPEG%2FZh5SeEjUT12rWxcLJ2nstPaB.jpg"
          alt="가츠동"
        />
      </li>
      <li className={$.menuItem}>
        <img
          className={$.menuImage}
          src="https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180130_263%2F1517301583613dwuaL_JPEG%2FZh5SeEjUT12rWxcLJ2nstPaB.jpg"
          alt="피자"
        />
        {isMoreContents && (
          <div className={$.moreStatus}>
            <ImagePlus className={$.morePlus} />
            <span className={$.moreText}>더보기</span>
          </div>
        )}
      </li>
    </ul>
  );
}

export default ImageList;
