import { NavLink } from "react-router-dom";

import { LongArrow } from "@components/atoms/icon";

import constructionInfo from "../../../__mocks__/constructionInfo";
import $ from "./style.module.scss";

function ConstructionInfo() {
  return (
    <>
      <div className={$.wrap}>
        <img
          className={$.image}
          src={constructionInfo.src}
          alt={constructionInfo.alt}
        />
        <div className={$.info}>
          <strong className={$.title}>{constructionInfo.title}</strong>
          <span className={$.address}>{constructionInfo.address}</span>
          <NavLink className={$.link} to="">
            <span className={$.text}>더보기</span>
            <LongArrow size={3} stroke="#aaa" />
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default ConstructionInfo;
