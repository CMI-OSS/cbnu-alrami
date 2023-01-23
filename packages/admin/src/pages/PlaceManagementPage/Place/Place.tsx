import { useQuery } from "react-query";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { useDeletePlaceMutation } from "src/api/place";
import { placeApiErrorMsg, placeApiSuccessMsg } from "src/constants/place";
import { getPlace } from "src/newApi/placeApi/getPlace";
import { isOutputType } from "src/newApi/types";
import ImagePreview from "src/pages/BoardPage/ArticleWrite/UploadImage/ImagePreview/ImagePreview";
import { openImagePreview } from "src/pages/BoardPage/ArticleWrite/UploadImage/ImagePreview/ImagePreview.store";
import { useAppDispatch } from "src/store";

import PlaceView, { PlaceViewProps } from "./Place.view";

export default function Place() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ deletePlace ] = useDeletePlaceMutation();
  const { data, isLoading } = useQuery(
    [ "place", placeId || "" ],
    () => getPlace(Number(placeId)),
    {
      enabled: !!placeId,
    },
  );

  if (isLoading || !data) return null;

  if (!isOutputType(data, "GetPlaceApiOutput_Success")) return null;

  const handleClickEdit = () => {
    navigate(`/place/edit/${data.content.id}`);
  };

  const handleClickDelete = async () => {
    try {
      await deletePlace({ id: data.content.id }).unwrap();
      alert(placeApiSuccessMsg("삭제"));
      navigate("/place/list");
    } catch (err) {
      alert(placeApiErrorMsg("삭제"));
    }
  };

  const placeViewProps: PlaceViewProps = {
    ...data.content,
    onClickEdit: handleClickEdit,
    onClickDelete: handleClickDelete,
    onClickImage: (e, index) => {
      dispatch(
        openImagePreview({
          images: data.content.images?.map((image) => image?.url || "") || [],
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
