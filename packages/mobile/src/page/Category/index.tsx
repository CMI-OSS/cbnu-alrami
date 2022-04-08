import { NavLink } from "react-router-dom";
import { MapArrow } from "src/components/atoms/icon/MapArrow";
import $ from "./style.module.scss";

function Category() {
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
    </>
  );
}

export default Category;
