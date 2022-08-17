import { NavLink } from "react-router-dom";

import { Plus } from "@components/atoms/icon";

import $ from "./style.module.scss";

type detailImageType = {
  id: number;
  createdAt: string;
  url: string;
};
type Props = {
  isMoreContents: boolean;
  detailImageList: detailImageType[];
  name: string;
};

function ImageList({ isMoreContents, detailImageList, name }: Props) {
  return (
    <ul className={$["menu-list"]}>
      {detailImageList.map((item, index) => {
        return (
          <>
            <li key={item.id} className={$["menu-item"]}>
              <img className={$["menu-image"]} src={item.url} alt={name} />
              {isMoreContents && index === 2 && (
                <NavLink to="/more" className={$["more-status"]}>
                  <div className={$["more-plus"]}>
                    <Plus stroke="#fff" size={35} />
                    {/* <ImagePlus className={$["more-plus"]} /> */}
                    <span className={$["more-text"]}>더보기</span>
                  </div>
                </NavLink>
              )}
            </li>
          </>
        );
      })}
    </ul>
  );
}

export default ImageList;
