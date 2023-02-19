import { NavLink } from "react-router-dom";

import { LongArrow } from "@components/atoms/icon";
import { PlaceSchoolDto } from "@shared/swagger-api/generated";
import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  schoolData: PlaceSchoolDto;
  type: "map" | "place";
  url: string;
  placeId: number;
};

function Spot({ schoolData, type, placeId, url }: Props) {
  return (
    <>
      <NavLink
        className={type === "place" ? $.item : $.wrap}
        to={`/school?id=${placeId}`}
      >
        <img
          className={classNames($.image, type === "place" && $["place-image"])}
          alt={schoolData?.name}
          src={url}
        />
        <div className={type === "map" ? $.info : $["place-info"]}>
          <strong className={$.title}>{schoolData?.name}</strong>
          <span
            className={classNames(
              $.address,
              type === "place" && $["place-address"],
            )}
          >
            {schoolData?.address}
          </span>
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
