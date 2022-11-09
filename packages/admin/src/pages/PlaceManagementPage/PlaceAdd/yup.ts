import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("이름을 입력해주세요"),
  latitude: yup.string().required("위도를 입력해주세요"),
  longtitude: yup.string().required("경도를 입력해주세요"),
  contact: yup.string().required("연락처를 입력해주세요"),
  description: yup.string().required("설명을 입력해주세요"),
  buildingNumber: yup.string().required("건물번호를 입력해주세요"),
  oldBuildingNumber: yup.string().required("예전 건물번호를 입력해주세요"),
  area: yup.string().required("건물 구역을 선택해주세요"),
});

export default schema;
