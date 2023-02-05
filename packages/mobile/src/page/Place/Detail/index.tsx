import { NavLink } from "react-router-dom";

import { LeftArrow } from "@components/atoms/icon";
import ChipGroup from "@components/molecules/ChipGroup";
import { useSchoolsQuery } from "@hooks/api/school";
import BorderBox from "src/components/atoms/BorderBox";
import useSearch from "src/hooks/useSearch";
import DetailGroup from "src/page/Place/DetailGroup";
import { useAppDispatch } from "src/store";
import { setHashMenu } from "src/store/placeSlice";

import { menuList } from "../../../__mocks__/index";
import $ from "./style.module.scss";

function PlaceDetail() {
  const dispatch = useAppDispatch();
  const position = useSearch({ target: "position" })!;
  const {
    data: schoolData,
    isLoading: schoolLoading,
    isError: schoolError,
  } = useSchoolsQuery();
  if (schoolLoading) return <div>로딩중입니다.</div>;
  if (schoolError) return <div>에러가 발생했습니다.</div>;
  if (schoolData === undefined)
    return <div>캠퍼스 장소 리스트 불러오기 실패</div>;

  const handleMenu = () => {
    dispatch(setHashMenu({ hashString: position }));
  };

  const currentPosition = position.split("")[0].toUpperCase();
  const schoolDatas = schoolData.filter((item: res.School) => {
    return item?.school.area === currentPosition || currentPosition === "A";
  });

  const checkMenu = (position: string) => {
    switch (position) {
      case "all":
        return 0;
      case "north":
        return 1;
      case "east":
        return 2;
      case "south":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <>
      <div className={$.header}>
        <NavLink to="/map" className={$.link}>
          <LeftArrow stroke="#aaa" size={16} />
          <span className="blind">뒤로가기</span>
        </NavLink>
        <h1 className={$.title}>캠퍼스맵</h1>
        {/* [D] 식당 작업 후 진행 예정 */}
        {/* <NavLink to="/call" className={$.place_link}>
          제보하기
        </NavLink> */}
      </div>
      <ChipGroup
        list={menuList}
        handleSelectMenu={handleMenu}
        selectedMenu={checkMenu(position)}
      />
      <BorderBox className={$.tooltip} style={{ width: "auto" }}>
        <span className={$.tooltip_title}>
          식사는 현재 베타버전으로, 다양한 맛집이 더 추가될 예정입니다.
        </span>
      </BorderBox>
      <DetailGroup schoolDatas={schoolDatas} />
    </>
  );
}

export default PlaceDetail;
