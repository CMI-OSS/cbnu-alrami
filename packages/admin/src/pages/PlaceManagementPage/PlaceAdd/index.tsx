import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import AddForm from "src/components/PlaceManagement/AddForm";
import { SchoolAddForm } from "src/types/place";

import $ from "./style.module.scss";
import schema from "./yup";

export default function PlaceAdd() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<SchoolAddForm, "imageIds">>({
    resolver: yupResolver(schema),
    defaultValues: { tags: "" },
  });

  const addAdmin = (adminData: Omit<SchoolAddForm, "imageIds">) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(adminData));

    // TODO: 어드민 생성 API 연동
  };

  const onSubmit: SubmitHandler<Omit<SchoolAddForm, "imageIds">> = (data) => {
    addAdmin(data);
    reset();
  };

  return (
    <div className={$.container}>
      <header>
        <h1 className={$.title}>건물 추가 페이지</h1>
      </header>
      <main className={$.main}>
        <section>
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
