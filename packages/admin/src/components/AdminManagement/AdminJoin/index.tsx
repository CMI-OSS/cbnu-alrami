import { ChangeEventHandler } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { AdminJoinFormInputs } from "src/types";

import JoinForm from "../JoinForm";
import SelectedBoardList from "../SelectedBoardList";
import $ from "./style.module.scss";
import schema from "./yup";

export default function AdminJoin() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AdminJoinFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: { authority: "super", boards: [] },
  });

  const addAdmin = (adminData: AdminJoinFormInputs) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(adminData));

    // TODO: 어드민 생성 API 연동
  };

  const onSubmit: SubmitHandler<AdminJoinFormInputs> = (data) => {
    addAdmin(data);
    reset();
  };

  const handleBoardSelectChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    if (value === "선택") return;
    const currentBoards = watch("boards");
    if (currentBoards.includes(value)) return;
    setValue("boards", [ ...currentBoards, value ]);
  };

  const handleDeleteBoard = (target: string) => {
    const currentBoards = watch("boards");
    setValue(
      "boards",
      currentBoards.filter((board) => {
        return board !== target;
      }),
    );
  };

  return (
    <div className={$.container}>
      <header>
        <h1 className={$.title}>관리자 추가 페이지</h1>
      </header>
      <main className={$.main}>
        <section>
          <JoinForm
            onSubmit={handleSubmit(onSubmit)}
            onBoardSelectChange={handleBoardSelectChange}
            register={register}
            errors={errors}
          />
        </section>
        <section className={$["side-section"]}>
          <SelectedBoardList
            boards={watch("boards")}
            onDeleteBoard={handleDeleteBoard}
          />
        </section>
      </main>
    </div>
  );
}
