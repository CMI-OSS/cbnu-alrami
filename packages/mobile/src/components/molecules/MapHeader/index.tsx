import { NavLink } from "react-router-dom";

import { MapArrow } from "@components/atoms/icon/MapArrow";

import $ from "./style.module.scss";

type props = {
  title: string;
};

function MapHeader({ title }: props) {
  return (
    <div className={$.header}>
      <NavLink to="./" className={$.link}>
        <MapArrow />
        <span className="blind">뒤로 가기</span>
      </NavLink>
      <strong className={$.title}>{title}</strong>
    </div>
  );
}

export default MapHeader;
