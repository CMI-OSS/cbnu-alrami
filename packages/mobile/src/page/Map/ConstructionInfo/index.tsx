import { NavLink } from "react-router-dom";

import { LongArrow } from "@components/atoms/icon";

import constructionInfo from "../../../__mocks__/constructionInfo";
import $ from "./style.module.scss";

type Props = {
  schoolData?: res.SchoolById | res.School;
  type: string;
  placeId: number;
};
function ConstructionInfo({ schoolData, type, placeId }: Props) {
  return (
    <>
      {type === "map" ? (
        <div className={$.wrap}>
          <img
            className={$.image}
            src={constructionInfo.src}
            alt={constructionInfo.alt}
          />
          <div className={$.info}>
            <strong className={$.title}>{schoolData?.name}</strong>
            <span className={$.address}>{schoolData?.address}</span>
            <NavLink className={$.link} to={`/place/school?id=${placeId}`}>
              <span className={$.text}>더보기</span>
              <LongArrow size={4} stroke="#aaa" />
            </NavLink>
          </div>
        </div>
      ) : (
        <>
          <NavLink to={`/place/school?id=${placeId}`} className={$.item}>
            <img
              className={$.school_image}
              src={schoolData?.images?.url}
              alt={schoolData?.name}
            />
            <div className={$.summary}>
              <strong className={$.summary_title}>{schoolData?.name}</strong>
              <span className={$.summary_description}>
                {schoolData?.address}
              </span>
            </div>
          </NavLink>
        </>
      )}
    </>
  );
}

export default ConstructionInfo;
