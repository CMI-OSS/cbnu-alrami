import $ from "./style.module.scss";

export default function ToastMsg({ msg = "메시지 없음" }) {
  return <div className={$.toast}>{msg}</div>;
}
