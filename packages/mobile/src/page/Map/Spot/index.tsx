import { NavLink } from "react-router-dom";

import { LongArrow } from "@components/atoms/icon";

import $ from "./style.module.scss";

type Props = {
  schoolData?: res.SchoolById | res.School;
  type: "map" | "place";
  placeId: number;
};
function Spot({ schoolData, type, placeId }: Props) {
  return (
    <>
      <NavLink
        className={type === "place" ? $.item : $.wrap}
        to={`/place/school/detail/${placeId}`}
      >
        <img className={$.image} alt={schoolData?.name} />
        <div className={$.info}>
          <strong className={$.title}>{schoolData?.name}</strong>
          <span className={$.address}>{schoolData?.address}</span>
          {type === "map" && (
            <NavLink className={$.link} to="">
              <span className={$.text}>더보기</span>
              <LongArrow size={4} stroke="#aaa" />
            </NavLink>
          )}
        </div>
      </NavLink>
    </>
  );
}

export default Spot;
