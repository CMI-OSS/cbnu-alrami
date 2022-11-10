import { useQuery } from "react-query";
import { useParams } from "react-router";

import { getPlace } from "src/newApi/placeApi/getPlace";
import { isOutputType } from "src/newApi/types";
import ImagePreview from "src/pages/BoardPage/ArticleWrite/UploadImage/ImagePreview/ImagePreview";
import { openImagePreview } from "src/pages/BoardPage/ArticleWrite/UploadImage/ImagePreview/ImagePreview.store";
import { useAppDispatch } from "src/store";

import PlaceView, { PlaceViewProps } from "./Place.view";

export default function Place() {
  const { placeId } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery(
    [ "place", placeId || "" ],
    () => getPlace(Number(placeId)),
    {
      enabled: !!placeId,
    },
  );
  if (isLoading || !data) return null;

  if (!isOutputType(data, "GetPlaceApiOutput_Success")) return null;

  const placeViewProps: PlaceViewProps = {
    ...data.content,
    onClickImage: (e, index) => {
      dispatch(
        openImagePreview({
          images: data.content.images.map((image) => image?.url || ""),
          currentIndex: index,
        }),
      );
    },
  };

  return (
    <>
      <PlaceView {...placeViewProps} />
      <ImagePreview />
    </>
  );
}
