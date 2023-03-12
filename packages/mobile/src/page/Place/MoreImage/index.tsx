import { useLocation } from 'react-router-dom';

import MapHeader from "@components/molecules/MapHeader";
import MapImageList from "@components/molecules/MapImageList";
import { Image as ImageType } from "@shared/swagger-api/generated";

type Props = {
  state: ImageType[]
}

function MoreImage() {
  const {state} = useLocation() as Props;

  const images = state;
  return (
    <>
      <MapHeader title="이미지" />
      <MapImageList images={images} />
    </>
  );
}

export default MoreImage;
