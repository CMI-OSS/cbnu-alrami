import { useQuery } from "react-query";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { PlaceApiService } from "@shared/swagger-api/generated/services/PlaceApiService";
import { useDeletePlaceMutation } from "src/api/place";
import { placeApiErrorMsg, placeApiSuccessMsg } from "src/constants/place";
import ImagePreview from "src/pages/BoardPage/ArticleWrite/UploadImage/ImagePreview/ImagePreview";
import { openImagePreview } from "src/pages/BoardPage/ArticleWrite/UploadImage/ImagePreview/ImagePreview.store";
import { useAppDispatch } from "src/store";

import PlaceView, { PlaceViewProps } from "./Place.view";

export default function Place() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ deletePlace ] = useDeletePlaceMutation();
  const { data: place, isLoading } = useQuery(
    [ "place", placeId || "" ],
    () => PlaceApiService.placeControllerFindOneSchool({ id: Number(placeId) }),
    {
      enabled: !!placeId,
    },
  );

  if (isLoading || !place) return null;

  const handleClickEdit = () => {
    navigate(`/place/edit/${place.id}`);
  };

  const handleClickDelete = async () => {
    try {
      await deletePlace({ id: place.id }).unwrap();
      alert(placeApiSuccessMsg("삭제"));
      navigate("/place/list");
    } catch (err) {
      alert(placeApiErrorMsg("삭제"));
    }
  };

  const placeViewProps: PlaceViewProps = {
    place,
    onClickEdit: handleClickEdit,
    onClickDelete: handleClickDelete,
    onClickImage: (e, index) => {
      dispatch(
        openImagePreview({
          images: place.images?.map((image) => image?.url || "") || [],
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
