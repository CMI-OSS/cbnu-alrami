import { Link } from "react-router-dom";

import BorderBox from "@components/atoms/BorderBox";
import { useMajorBoardTree } from "src/api/boardTree";
import SubscriptionModalTemplate from "src/components/templates/SubscriptionModalTemplate";
import { GUIDE } from "src/page/Subscription/constant";
import $ from "src/page/Subscription/style.module.scss";

function MajorProcess1() {
  const {
    data: boardMajorTree,
    isLoading,
    isError,
    breadCrumb,
  } = useMajorBoardTree();

  if (isLoading) return <div>로딩중입니다.</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <SubscriptionModalTemplate>
      <div className={$.guide}>
        <div className={$.title}>{breadCrumb}</div>
        <div className={$.content}>{GUIDE.all_depth1}</div>
      </div>
      {boardMajorTree?.children.map((data) => (
        <Link to={`/subscription/major/${data.id}`} key={data.id}>
          <BorderBox
            key={data.name}
            height={87}
            background="#F6F5FB"
            style={{ marginBottom: "12px" }}
          >
            <div className={$["subscription-box-base"]}>
              <span className={$.title}>{data.name}</span>
            </div>
          </BorderBox>
        </Link>
      ))}
    </SubscriptionModalTemplate>
  );
}

export default MajorProcess1;
