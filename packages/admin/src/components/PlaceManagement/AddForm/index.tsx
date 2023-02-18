import { UseFormRegister } from "react-hook-form";

import { PlaceSchoolDto } from "@shared/swagger-api/generated/models/PlaceSchoolDto";
import Select from "src/components/AdminManagement/Select";
import TextInput from "src/components/AdminManagement/TextInput";
import { SchoolAddFormErrors } from "src/types/place";

import $ from "./style.module.scss";

type Props = {
  isAdd: boolean;
  onSubmit: () => void;
  register: UseFormRegister<Omit<PlaceSchoolDto, "imageIds">>;
  errors: SchoolAddFormErrors;
};

const AREAS = [ "E", "N", "S" ];

export default function AddForm({
  isAdd,
  onSubmit: handleSubmit,
  register,
  errors,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="name"
        className={$.input}
        errorMessage={errors.name?.message}
        label="건물 이름"
        register={() => {
          return register("name");
        }}
      />
      <TextInput
        id="latitude"
        className={$.input}
        errorMessage={errors.latitude?.message}
        label="위도"
        register={() => {
          return register("latitude");
        }}
      />
      <TextInput
        id="longtitude"
        className={$.input}
        errorMessage={errors.longtitude?.message}
        label="경도"
        register={() => {
          return register("longtitude");
        }}
      />
      <TextInput
        id="address"
        className={$.input}
        errorMessage={errors.address?.message}
        label="주소"
        register={() => {
          return register("address");
        }}
      />
      {/* <TextInput
        id="contact"
        className={$.input}
        errorMessage={errors.contact?.message}
        label="연락처"
        register={() => {
          return register("contact");
        }}
      /> */}
      {/* <TextArea
        id="description"
        className={$.input}
        errorMessage={errors.description?.message}
        label="설명"
        register={() => {
          return register("description");
        }}
      /> */}
      <TextInput
        id="buildingNumber"
        className={$.input}
        errorMessage={errors.buildingNumber?.message}
        label="건물번호"
        register={() => {
          return register("school.buildingNumber");
        }}
      />
      <TextInput
        id="oldBuildingNumber"
        className={$.input}
        errorMessage={errors.oldBuildingNumber?.message}
        label="예전 건물번호"
        register={() => {
          return register("school.oldBuildingNumber");
        }}
      />
      <Select
        className={$.select}
        id="area"
        options={AREAS}
        label="건물 구역"
        register={() => {
          return register("school.area");
        }}
      />
      <button
        type="submit"
        className={$["submit-button"]}
        aria-label="건물 만들기"
      >
        건물 {isAdd ? "추가" : "수정"}
      </button>
    </form>
  );
}
