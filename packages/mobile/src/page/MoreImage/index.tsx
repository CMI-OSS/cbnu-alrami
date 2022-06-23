import MapHeader from "@components/molecules/MapHeader";
import MapImageList from "@components/molecules/MapImageList";

import mapImageList from "../../__mocks__/mapImageList";
import $ from "./style.module.scss";

function MoreImage() {
  return (
    <>
      <MapHeader title="이미지" />
      <MapImageList mapImageList={mapImageList} />
    </>
  );
}

export default MoreImage;
