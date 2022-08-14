import { NavLink } from "react-router-dom";

import { LongArrow } from "@components/atoms/icon";

import $ from "./style.module.scss";

type Props = {
  schoolData?: res.SchoolById | res.School;
  type: "map" | "place";
  placeId: number;
};
function Spot({ schoolData, type, placeId }: Props) {
  const urlData =
    type === "place" ? schoolData?.image?.url : schoolData?.images[0]?.url;
  return (
    <>
      <NavLink
        className={type === "place" ? $.item : $.wrap}
        to={`/place/school?id=${placeId}`}
      >
        <img className={$.image} alt={schoolData?.name} src={urlData} />
        <div className={$.info}>
          <strong className={$.title}>{schoolData?.name}</strong>
          <span className={$.address}>{schoolData?.address}</span>
          {type === "map" && (
            <span className={$.link}>
              <span className={$.text}>더보기</span>
              <LongArrow size={4} stroke="#aaa" />
            </span>
          )}
        </div>
      </NavLink>
    </>
  );
}

export default Spot;
