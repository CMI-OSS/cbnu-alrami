import ImageList from "@components/molecules/ImageList";
import { PlaceSchoolDto } from "@shared/swagger-api/generated";
import classNames from "classnames";
import BorderBox from "src/components/atoms/BorderBox";
import { useSchoolQuery } from "src/hooks/api/school";
import useSearch from "src/hooks/useSearch";
import Info from "src/page/Map/Info";

import $ from "./style.module.scss";

function MapDetailBody() {
  const detailId = +useSearch({ target: "id" })!;
  const { data: detailData } = useSchoolQuery({ id: detailId });

  if (!detailData) return null;
  const { school, name, address, contact, description, images } =
    detailData as PlaceSchoolDto;
  return (
    <>
      <div
        className={$["back-image"]}
        style={{
          backgroundImage: `url(
            ${images![0]?.url}
          )`,
        }}
      />
      <Info
        buildingNumber={school?.buildingNumber}
        oldBuildingNumber={school?.oldBuildingNumber}
        name={name}
        address={address}
        contact={contact}
      />
      <BorderBox className={classNames($.menu, $.description)}>
        <strong className={$["description-title"]}>설명</strong>
        <p className={$["description-text"]}>{description}</p>
      </BorderBox>
      <BorderBox className={$.detail}>
        <strong className={$["detail-title"]}>상세이미지</strong>
        <ImageList name={name} images={images} />
      </BorderBox>
    </>
  );
}

export default MapDetailBody;
