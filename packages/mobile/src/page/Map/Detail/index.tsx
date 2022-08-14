import { useNavigate } from "react-router-dom";

import { LeftArrow } from "@components/atoms/icon";
import ImageList from "@components/molecules/ImageList";
import { useSchoolById } from "src/api/school";
import BorderBox from "src/components/atoms/BorderBox";
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
  } = useSchoolById(detailId);
  if (detailLoading) return <div>로딩중입니다.</div>;
  if (detailError) return <div>에러가 발생했습니다.</div>;
  if (detailData === undefined)
    return <div>캠퍼스 장소 리스트 불러오기 실패</div>;

  const detailSeveralData = detailData!.data;

  const imageUrl =
    "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180130_263%2F1517301583613dwuaL_JPEG%2FZh5SeEjUT12rWxcLJ2nstPaB.jpg";

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
            ${detailSeveralData?.images[0]?.url}
          )`,
        }}
      />
      <Info
        buildingNumber={detailSeveralData?.school?.buildingNumber}
        oldBuildingNumber={detailSeveralData?.school?.oldBuildingNumber}
        name={detailSeveralData?.name}
        address={detailSeveralData?.address}
      />
      <BorderBox className={$.menu}>
        <strong className={$["description-title"]}>설명</strong>
        <p className={$["description-text"]}>
          {detailSeveralData?.description}
        </p>
      </BorderBox>
      <BorderBox className={$.detail}>
        <strong className={$["detail-title"]}>상세이미지</strong>
        <ImageList
          isMoreContents
          name={detailSeveralData?.name}
          detailImageList={detailSeveralData?.images}
        />
      </BorderBox>
    </div>
  );
}

export default MapDetail;
