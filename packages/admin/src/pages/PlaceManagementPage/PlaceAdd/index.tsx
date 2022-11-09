import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import AddForm from "src/components/PlaceManagement/AddForm";
import { initImgList } from "src/pages/BoardPage/ArticleWrite/ArticleWrite.store";
import UploadImage from "src/pages/BoardPage/ArticleWrite/UploadImage/UploadImage";
import { useAppDispatch, useAppSelector } from "src/store";
import { SchoolAddForm } from "src/types/place";

import $ from "./style.module.scss";
import schema from "./yup";

export default function PlaceAdd() {
  const [ errMsg, setErrMsg ] = useState("");
  const dispatch = useAppDispatch();
  const { images } = useAppSelector((state) => state.ArticelWriteReducer);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<SchoolAddForm, "imageIds">>({
    resolver: yupResolver(schema),
    defaultValues: { tags: "" },
  });

  useEffect(() => {
    dispatch(initImgList());
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

  const addPlace = (body: SchoolAddForm) => {
    console.log(JSON.stringify(body));

    // TODO: 어드민 생성 API 연동
  };

  const onSubmit: SubmitHandler<Omit<SchoolAddForm, "imageIds">> = (data) => {
    const imgIds = refineImgList();
    if (!imgIds.length) return;
    const body = mergeImgAndForm(imgIds, data);
    addPlace(body);
    reset();
  };

  return (
    <div className={$.container}>
      <header>
        <h1 className={$.title}>건물 추가 페이지</h1>
      </header>
      <main className={$.main}>
        <section>
          <UploadImage />
          <span className={$["error-message"]}>{errMsg}</span>
          <AddForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
          />
        </section>
      </main>
    </div>
  );
}
