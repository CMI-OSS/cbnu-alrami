import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { MapArrow } from "@components/atoms/icon/MapArrow";
import Chips from "@components/molecules/Chips";
import { useAppDispatch, useAppSelector } from "src/store";
import { setHashMenu } from "src/store/placeSlice";

import {
  constructionList,
  foodList,
  imageList,
  menuList,
  playList,
  snackList,
} from "../../../__mocks__/index";
import $ from "./style.module.scss";

interface Props {
  menuType: number;
}
function PlaceTemplate({ menuType }: Props) {
  const dispatch = useAppDispatch();
  const [ menu, setMenu ] = useState(0);
  const getHashList = () => {
    switch (menuType) {
      case 1:
        return constructionList;
      case 2:
        return foodList;
      case 4:
        return snackList;
      case 5:
        return playList;
      default:
        return constructionList;
    }
  };

  const handleMenu = (idx: number) => {
    setMenu(idx);
    dispatch(setHashMenu({ hashNumber: 0 }));
  };

  return (
    <>
      <div className={$.header}>
        <NavLink to="/map" className={$.link}>
          <MapArrow />
          <span className="blind">뒤로가기</span>
        </NavLink>
        <h1 className={$.title}>장소</h1>
        <NavLink to="/call" className={$.place_link}>
          제보하기
        </NavLink>
      </div>
      <div className={$.menu}>
        <div className={$.list}>
          {menuList.map((item, idx) => {
            return (
              <NavLink
                key={`menu-${item.id}`}
                to={item.path}
                className={$.menu_link}
                onClick={() => handleMenu(idx)}
                aria-selected={menuType === idx + 1}
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className={$.content}>
        <Chips list={getHashList()} />
        <div className={$.image_list}>
          {imageList.map((item, idx) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <NavLink to="/" className={$.item} key={`menu-${idx}`}>
                <img
                  className={$.school_image}
                  src={item.src}
                  alt={item.name}
                />
                <div className={$.summary}>
                  <strong className={$.summary_title}>{item.name}</strong>
                  <span className={$.summary_description}>
                    {item.description}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PlaceTemplate;
