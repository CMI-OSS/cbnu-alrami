import ImageList from "@components/molecules/ImageList";
import classNames from "classnames";
import BorderBox from "src/components/atoms/BorderBox";
import { useSchoolOneQuery } from "src/hooks/api/school";
import useSearch from "src/hooks/useSearch";
import Info from "src/page/Map/Info";

import $ from "./style.module.scss";

function MapDetailBody() {
    const detailId = +useSearch({ target: "id" })!;
    const {
      data: detailData,
    } = useSchoolOneQuery({ id: detailId });

    if(!detailData) return null;

    return (
        <>
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
        </>
    )
}

export default MapDetailBody;