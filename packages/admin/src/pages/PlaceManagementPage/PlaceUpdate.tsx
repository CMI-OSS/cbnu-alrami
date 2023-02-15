import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { PlaceApiService } from "@shared/swagger-api/generated/services/PlaceApiService";

import PlaceFormTemplate from "./PlaceForm";

export default function PlaceAdd() {
  const { placeId } = useParams();
  const { data: place, isLoading } = useQuery(
    [ "place", placeId || "" ],
    () => PlaceApiService.placeControllerFindOneSchool({ id: Number(placeId) }),
    {
      enabled: !!placeId,
    },
  );

  if (isLoading || !place) return <div>로딩 중</div>;

  return <PlaceFormTemplate type="edit" place={place} />;
}
