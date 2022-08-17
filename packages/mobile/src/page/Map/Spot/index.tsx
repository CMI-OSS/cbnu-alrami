import { NavLink } from "react-router-dom";

import { LongArrow } from "@components/atoms/icon";

import $ from "./style.module.scss";

type Props = {
  schoolData: res.School | res.SchoolById;
  type: "map" | "place";
  url: string;
  placeId: number;
};
function Spot({ schoolData, type, placeId, url }: Props) {
  return (
    <>
      <NavLink
        className={type === "place" ? $.item : $.wrap}
        to={`/place/school?id=${placeId}`}
      >
        <img className={$.image} alt={schoolData?.name} src={url} />
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
