import { useState } from "react";
import { NavLink } from "react-router-dom";

import Flicking from "@egjs/react-flicking";
import { MapArrow } from "src/components/atoms/icon/MapArrow";

import $ from "./style.module.scss";

const menuList = [
  { id: 1, name: "학교", path: "/school" },
  { id: 2, name: "식사", path: "/food" },
];

const hashList = [
  { id: 1, name: "#학교", path: "/school_hash" },
  { id: 2, name: "#N구역", path: "/area" },
  { id: 3, name: "#8인_테이블", path: "/table" },
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

function Category() {
  const [ menu, setMenu ] = useState(1);
  const [ hash, setHash ] = useState(1);

  return (
    <>
      <div className={$.header}>
        <NavLink to="/map" className={$.link}>
          <MapArrow />
          <span className="blind">뒤로가기</span>
        </NavLink>
        <h1 className={$.title}>리스트</h1>
        <button type="button" className={$.button}>
          제보하기
        </button>
      </div>
      <div className={$.menu}>
        <Flicking
          className={$.flicking}
          moveType="freeScroll"
          bound
          align="prev"
          horizontal
        >
          <div className={$.list}>
            {menuList.map((item, idx) => {
              return (
                <NavLink
                  key={`menu-${item.id}`}
                  to={item.path}
                  className={$.menu_link}
                  onClick={() => setMenu(idx)}
                  aria-selected={menu === idx + 1}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </Flicking>
      </div>
      <div className={$.content}>
        <div className={$.hash}>
          {hashList.map((item, idx) => {
            return (
              <NavLink
                key={`menu-${item.id}`}
                to={item.path}
                className={$.hash_link}
                onClick={() => setHash(idx)}
                aria-selected={hash === idx + 1}
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
        <div className={$.image_list}>
          {imageList.map((item, idx) => {
            return (
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

export default Category;
