import { NavLink } from "react-router-dom";

import { LongArrow } from "@components/atoms/icon";
import { useSchoolById } from "src/api/school";

import constructionInfo from "../../../__mocks__/constructionInfo";
import $ from "./style.module.scss";

type Props = {
  placeId: number;
};
function ConstructionInfo({ placeId }: Props) {
  const {
    data: schoolData,
    isLoading: schoolLoading,
    isError: schoolError,
  } = useSchoolById(placeId);

  if (schoolLoading) return <div>로딩중입니다.</div>;
  if (schoolError) return <div>에러가 발생했습니다.</div>;
  if (schoolData === undefined) return <div>위치 정보 가져오기 실패</div>;

  const schoolPlaceData = schoolData!.data;
  return (
    <>
      <div className={$.wrap}>
        <img
          className={$.image}
          src={constructionInfo.src}
          alt={constructionInfo.alt}
        />
        <div className={$.info}>
          <strong className={$.title}>{schoolPlaceData?.name}</strong>
          <span className={$.address}>{schoolPlaceData?.address}</span>
          <NavLink className={$.link} to="">
            <span className={$.text}>더보기</span>
            <LongArrow size={4} stroke="#aaa" />
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default ConstructionInfo;
