import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { CreatePlaceDto } from "@shared/swagger-api/generated/models/CreatePlaceDto";
import { PlaceSchoolDto } from "@shared/swagger-api/generated/models/PlaceSchoolDto";
import { PlaceApiService } from "@shared/swagger-api/generated/services/PlaceApiService";
import { initImgList } from "src/pages/BoardPage/ArticleWrite/ArticleWrite.store";
import { useAppDispatch, useAppSelector } from "src/store";

import { getObjKeyNames } from "../place.utils";
import PlaceFormView, { PlaceFormViewProps } from "./PlaceForm.view";
import schema from "./yup";

type Props = {
  type: "add" | "edit";
  place?: PlaceSchoolDto;
};

export default function PlaceFormTemplate(props: Props) {
  const { type, place } = props;
  const isAdd = type === "add";
  const [ errMsg, setErrMsg ] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { images } = useAppSelector((state) => state.ArticelWriteReducer);

  const apiKindMsg = isAdd ? "추가" : "수정";

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<PlaceSchoolDto, "imageIds">>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const setValues = () => {
    if (!place || isAdd) return;
    const keys = getObjKeyNames(place || {});
    keys.forEach((key) => {
      setValue(key, place[key]);
    });
  };

  useEffect(() => {
    if (place && !isAdd) setValues();
    dispatch(initImgList(place?.images || []));
  }, []);

  useEffect(() => {
    if (!images?.length) {
      setErrMsg("이미지를 1개 이상 올려주세요.");
      return;
    }
    setErrMsg("");
  }, [ images ]);

  const refineImgList = (): number[] => {
    return place?.images?.map(({ id }) => id) ?? [];
  };

  const mergeImgAndForm = (
    imageIds: number[],
    data: Omit<PlaceSchoolDto, "imageIds">,
  ): CreatePlaceDto => {
    return { imageIds, ...data };
  };

  const postPlace = async (body: CreatePlaceDto) => {
    try {
      if (isAdd) {
        await PlaceApiService.placeControllerCreate({ requestBody: body });
      } else {
        await PlaceApiService.placeControllerUpdate({
          id: place?.id as number,
          requestBody: body,
        });
      }
      reset();
      dispatch(initImgList([]));
      if (!isAdd) navigate(`/places/list/${place?.id}`);
    } catch (err) {
      alert(err);
    }
  };

  const onSubmit: SubmitHandler<Omit<PlaceSchoolDto, "imageIds">> = (data) => {
    const imgIds = refineImgList();
    if (!imgIds.length) return;
    const body = mergeImgAndForm(imgIds, data);
    postPlace(body);
  };

  const placeFormViewProps: PlaceFormViewProps = {
    apiKindMsg,
    errors,
    errMsg,
    isAdd,
    register,
    handleSubmit,
    onSubmit,
  };

  return <PlaceFormView {...placeFormViewProps} />;
}
