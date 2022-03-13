import { Arrow } from "src/components/shared/icon/Arrow";
import $ from "./style.module.scss";
import BorderBox from "../../shared/BorderBox";

function Schedule() {
  return (
    <div className={$.schedule}>
      <BorderBox width={271} height={101} style={{ minWidth: "271px" }}>
        <p>중간고사</p>
        <Arrow />
      </BorderBox>
      <BorderBox width={271} height={101} style={{ minWidth: "271px" }}>
        <p>제목이 아주 긴 일정 제목이 아주 긴일정 제목이 아주 긴</p>
        <Arrow />
      </BorderBox>
      <BorderBox width={271} height={101} style={{ minWidth: "271px" }}>
        <p>중간고사</p>
        <Arrow />
      </BorderBox>
    </div>
  );
}

export default Schedule;
