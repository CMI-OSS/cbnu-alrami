import { useState } from "react";
import { NavLink } from "react-router-dom";

import Flicking from "@egjs/react-flicking";
import { MapArrow } from "src/components/atoms/icon/MapArrow";

import $ from "./style.module.scss";

const menuList = [
  { id: 1, name: "학교", path: "/school" },
  { id: 2, name: "식사", path: "/food" },
];

function Category() {
  const [ menu, setMenu ] = useState(1);

  return (
    <>
      <div className={$.header}>
        <NavLink to="../map" className={$.link}>
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
    </>
  );
}

export default Category;
