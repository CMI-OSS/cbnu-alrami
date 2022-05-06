import * as yup from "yup";

const schema = yup.object({
  id: yup.string().required("아이디를 입력해주세요"),
  password: yup.string().required("비밀번호를 입력해주세요"),
  passwordConfirm: yup
    .string()
    .required("비밀번호를 한번 더 입력해주세요")
    .oneOf([ yup.ref("password") ], "비밀번호 확인: 비밀번호가 다릅니다"),
  nickname: yup.string().required("닉네임을 입력해주세요"),
});

export default schema;
