import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { getPlace } from "src/newApi/placeApi/getPlace";
import { isOutputType } from "src/newApi/types";

import { dataToSchoolFormState } from "./place.utils";
import PlaceFormTemplate from "./PlaceForm";

export default function PlaceAdd() {
  const { placeId } = useParams();
  const { data, isLoading } = useQuery(
    [ "place", placeId || "" ],
    () => getPlace(Number(placeId)),
    {
      enabled: !!placeId,
    },
  );

  if (isLoading || !data) return <div>로딩 중</div>;
  if (!isOutputType(data, "GetPlaceApiOutput_Success"))
    return <div>에러 발생</div>;
  const { images, ...rest } = dataToSchoolFormState(data?.content);

  return <PlaceFormTemplate type="edit" state={rest} stateImgs={images} />;
}
