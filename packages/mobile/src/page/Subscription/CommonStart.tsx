import BorderBox from "src/components/atoms/BorderBox";
import { GUIDE } from "src/page/Subscription/constant";
import $ from "src/page/Subscription/style.module.scss";

function CommonStart() {
  const COMMON_START_CONTENTS = [
    { title: "공통", description: "충북대학교의 다향한 공지사항을 확인해요" },
    { title: "전공", description: "전공 별 공지사항을 확인해요" },
  ];
  return (
    <div className={$["common-start"]}>
      <div className={$.guide}>
        <div className={$.title}>전체</div>
        <div className={$.content}>{GUIDE.common_start}</div>
      </div>
      {COMMON_START_CONTENTS.map((content) => {
        return (
          <BorderBox
            key={content.title}
            height={87}
            background="#F6F5FB"
            style={{ marginBottom: "12px" }}
          >
            <div className={$["subscription-box-content"]}>
              <span className={$.title}>{content.title}</span>
              <span className={$.content}>{content.description}</span>
            </div>
          </BorderBox>
        );
      })}
    </div>
  );
}

export default CommonStart;
