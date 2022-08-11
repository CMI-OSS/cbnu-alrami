import MapHeader from "@components/molecules/MapHeader";
import MapImageList from "@components/molecules/MapImageList";

import mapImageList from "../../../__mocks__/mapImageList";

function MoreImage() {
  return (
    <>
      <MapHeader title="이미지" />
      <MapImageList mapImageList={mapImageList} />
    </>
  );
}

export default MoreImage;
