import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAddPlaceMutation, useEditPlaceMutation } from "src/api/place";
import AddForm from "src/components/PlaceManagement/AddForm";
import { placeApiErrorMsg, placeApiSuccessMsg } from "src/constants/place";
import { initImgList } from "src/pages/BoardPage/ArticleWrite/ArticleWrite.store";
import UploadImage from "src/pages/BoardPage/ArticleWrite/UploadImage/UploadImage";
import { useAppDispatch, useAppSelector } from "src/store";
import { SchoolAddForm } from "src/types/place";

import { getObjKeyNames, RefinedSchoolState } from "../place.utils";
import $ from "./style.module.scss";
import schema from "./yup";

type Props = {
  type: "add" | "edit";
  state?: Omit<RefinedSchoolState, "images">;
  stateImgs?: RefinedSchoolState["images"];
};

export default function PlaceFormTemplate(props: Props) {
  const { type, state, stateImgs } = props;
  const isAdd = type === "add";
  const [ errMsg, setErrMsg ] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ addPlace ] = useAddPlaceMutation();
  const [ editPlace ] = useEditPlaceMutation();
  const { images } = useAppSelector((state) => state.ArticelWriteReducer);
  const api = isAdd ? addPlace : editPlace;
  const apiResultMsg = isAdd ? "추가" : "수정";

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<SchoolAddForm, "imageIds">>({
    resolver: yupResolver(schema),
    defaultValues: { tags: "" },
  });

  const setValues = () => {
    if (!state || isAdd) return;
    const keys = getObjKeyNames(state || {});
    keys.forEach((key) => {
      setValue(key, state[key]);
    });
  };

  useEffect(() => {
    if (state && !isAdd) setValues();
    dispatch(initImgList(stateImgs || []));
  }, []);

  useEffect(() => {
    if (!images.length) {
      setErrMsg("이미지를 1개 이상 올려주세요.");
      return;
    }
    setErrMsg("");
  }, [ images ]);

  const refineImgList = (): number[] => {
    return images.map(({ id }) => id);
  };

  const mergeImgAndForm = (
    imageIds: number[],
    data: Omit<SchoolAddForm, "imageIds">,
  ): SchoolAddForm => {
    return { imageIds, ...data };
  };

  const postPlace = async (body: SchoolAddForm) => {
    try {
      await api(body).unwrap();
      reset();
      dispatch(initImgList([]));
      alert(placeApiSuccessMsg(apiResultMsg));
      if (!isAdd) navigate(`/places/list/${state?.id}`);
    } catch (err) {
      alert(placeApiErrorMsg(apiResultMsg));
    }
  };

  const onSubmit: SubmitHandler<Omit<SchoolAddForm, "imageIds">> = (data) => {
    const imgIds = refineImgList();
    if (!imgIds.length) return;
    const body = mergeImgAndForm(imgIds, data);
    postPlace(body);
  };

  return (
    <div className={$.container}>
      <header>
        <h1 className={$.title}>건물 {apiResultMsg} 페이지</h1>
      </header>
      <main className={$.main}>
        <section>
          <UploadImage />
          <span className={$["error-message"]}>{errMsg}</span>
          <AddForm
            isAdd={isAdd}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
          />
        </section>
      </main>
    </div>
  );
}
