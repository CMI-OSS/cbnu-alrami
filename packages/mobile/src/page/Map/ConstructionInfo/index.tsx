import { NavLink } from "react-router-dom";

import { LongArrow } from "@components/atoms/icon";

import constructionInfo from "../../../__mocks__/constructionInfo";
import $ from "./style.module.scss";

// TODO: ConstructionInfo | Place의 첫 페이지에 들어가는 컴포넌트 공통화
function ConstructionInfo() {
  return (
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
          <LongArrow size={4} stroke="#aaa" />
        </NavLink>
      </div>
    </div>
  );
}

export default ConstructionInfo;
