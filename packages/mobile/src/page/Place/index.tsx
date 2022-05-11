import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { MapArrow } from "@components/atoms/icon/MapArrow";
import Chips from "@components/molecules/Chips";
import { useAppDispatch, useAppSelector } from "src/store";
import { setHashMenu } from "src/store/placeSlice";

import $ from "./style.module.scss";

const menuList = [
  { id: 1, name: "학교", path: "/place?category=1" },
  { id: 2, name: "식사", path: "/place?category=2" },
  { id: 3, name: "편리", path: "/place?category=3" },
  { id: 4, name: "간식", path: "/place?category=4" },
  { id: 5, name: "놀거리", path: "/place?category=5" },
];

const constructionList = [
  { id: 1, name: "건물", path: "/place?category=1&subCategory=1" },
  { id: 2, name: "식당", path: "/place?category=1&subCategory=2" },
  { id: 3, name: "기숙사", path: "/place?category=1&subCategory=3" },
  { id: 4, name: "명소", path: "/place?category=1&subCategory=4" },
  { id: 5, name: "프린터기", path: "/place?category=1&subCategory=5" },
];

const foodList = [
  { id: 1, name: "한식", path: "/place?category=2&subCategory=1" },
  { id: 2, name: "중식", path: "/place?category=2&subCategory=2" },
  { id: 3, name: "일식", path: "/place?category=2&subCategory=3" },
  { id: 4, name: "양식", path: "/place?category=2&subCategory=4" },
];

const snackList = [
  { id: 1, name: "카페", path: "/place?category=4&subCategory=1" },
  { id: 2, name: "아이스크림", path: "/place?category=4&subCategory=2" },
];

const playList = [
  { id: 1, name: "PC방", path: "/place?category=5&subCategory=1" },
  { id: 2, name: "코인노래방", path: "/place?category=5&subCategory=2" },
  { id: 3, name: "즉석사진", path: "/place?category=5&subCateogry=3" },
  { id: 4, name: "기타", path: "/place?category=5&subCategory=4" },
];

const imageList = [
  {
    id: 1,
    name: "충북대학교 사회과학대학",
    description: "충청북도 청주시 흥덕구 사창동 470",
    src: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180130_263%2F1517301583613dwuaL_JPEG%2FZh5SeEjUT12rWxcLJ2nstPaB.jpg",
  },
  {
    id: 2,
    name: "충북대학교 사회과학대학",
    description: "충청북도 청주시 흥덕구 사창동 470",
    src: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180130_263%2F1517301583613dwuaL_JPEG%2FZh5SeEjUT12rWxcLJ2nstPaB.jpg",
  },
  {
    id: 3,
    name: "충북대학교 사회과학대학",
    description: "충청북도 청주시 흥덕구 사창동 470",
    src: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180130_263%2F1517301583613dwuaL_JPEG%2FZh5SeEjUT12rWxcLJ2nstPaB.jpg",
  },
  {
    id: 4,
    name: "충북대학교 사회과학대학",
    description: "충청북도 청주시 흥덕구 사창동 470",
    src: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180130_263%2F1517301583613dwuaL_JPEG%2FZh5SeEjUT12rWxcLJ2nstPaB.jpg",
  },
  {
    id: 5,
    name: "충북대학교 사회과학대학",
    description: "충청북도 청주시 흥덕구 사창동 470",
    src: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180130_263%2F1517301583613dwuaL_JPEG%2FZh5SeEjUT12rWxcLJ2nstPaB.jpg",
  },
];

function Place() {
  const [ menu, setMenu ] = useState(0);
  const dispatch = useAppDispatch();

  const getHashList = () => {
    switch (menu) {
      case 0:
        return constructionList;
      case 1:
        return foodList;
      case 3:
        return snackList;
      case 4:
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
                aria-selected={menu === idx}
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

export default Place;
