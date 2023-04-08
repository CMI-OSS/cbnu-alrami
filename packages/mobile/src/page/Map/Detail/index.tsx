import { LeftArrow } from "@components/atoms/icon";
import ImageList from "@components/molecules/ImageList";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import classNames from "classnames";
import BorderBox from "src/components/atoms/BorderBox";
import { useSchoolOneQuery } from "src/hooks/api/school";
import useSearch from "src/hooks/useSearch";
import Info from "src/page/Map/Info";

import $ from "./style.module.scss";

function MapDetail() {
  const detailId = +useSearch({ target: "id" })!;
  const {
    data: detailData,
    isLoading: detailLoading,
    isError: detailError,
  } = useSchoolOneQuery({ id: detailId });
  if (detailLoading) return <div>로딩중입니다.</div>;
  if (detailError) return <div>에러가 발생했습니다.</div>;
  if (detailData === undefined)
    return <div>캠퍼스 장소 리스트 불러오기 실패</div>;

  return (
    <FullPageModalTemplate
      left={<LeftArrow stroke="#5e5e5e" size={16} />}
      style={{ background: "none" }}
    >
      {/* [D] 식당 스펙 추가 후 작업 진행 예정 */}
      {/* <NavLink to="/call" className={$["link-call"]}>
          <span className="blind">제보하기</span>
        </NavLink> */}
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
        <ImageList name={detailData.name} images={detailData.images!} />
      </BorderBox>
    </FullPageModalTemplate>
  );
}

export default MapDetail;
