import { useNavigate } from "react-router-dom";

import { LeftArrow } from "@components/atoms/icon";
import ImageList from "@components/molecules/ImageList";
import classNames from "classnames";
import BorderBox from "src/components/atoms/BorderBox";
import { useSchoolOneQuery } from "src/hooks/api/school";
import useSearch from "src/hooks/useSearch";
import Info from "src/page/Map/Info";

import $ from "./style.module.scss";

function MapDetail() {
  const navigate = useNavigate();
  const detailId = +useSearch({ target: "id" })!;
  const {
    data: detailData,
    isLoading: detailLoading,
    isError: detailError,
  } = useSchoolOneQuery({id: detailId});
  if (detailLoading) return <div>로딩중입니다.</div>;
  if (detailError) return <div>에러가 발생했습니다.</div>;
  if (detailData === undefined)
    return <div>캠퍼스 장소 리스트 불러오기 실패</div>;

  return (
    <div className={$.wrap}>
      <div className={$.header}>
        <button
          type="button"
          className={$["detail-button"]}
          onClick={() => {
            return navigate(-1);
          }}
        >
          <LeftArrow stroke="#fff" size={16} />
          <span className="blind">뒤로 가기</span>
        </button>
        {/* [D] 식당 스펙 추가 후 작업 진행 예정 */}
        {/* <NavLink to="/call" className={$["link-call"]}>
          <span className="blind">제보하기</span>
        </NavLink> */}
      </div>
      <div
        className={$["back-image"]}
        style={{
          backgroundImage: `url(
            ${detailData.images![0]?.url}
          )`,
        }}
      />
      <Info
        buildingNumber={detailData.school?.buildingNumber}
        oldBuildingNumber={detailData.school?.oldBuildingNumber}
        name={detailData.name}
        address={detailData.address}
        contact={detailData.contact}
      />
      <BorderBox className={classNames($.menu, $.description)}>
        <strong className={$["description-title"]}>설명</strong>
        <p className={$["description-text"]}>{detailData.description}</p>
      </BorderBox>
      <BorderBox className={$.detail}>
        <strong className={$["detail-title"]}>상세이미지</strong>
        <ImageList
          name={detailData.name}
          images={detailData.images!}
        />
      </BorderBox>
    </div>
  );
}

export default MapDetail;
