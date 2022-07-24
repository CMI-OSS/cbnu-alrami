import { Link, useParams } from "react-router-dom";

import { useCollegeBoardTree } from "src/api/boardTree";
import BorderBox from "src/components/atoms/BorderBox";
import SubscriptionModalTemplate from "src/components/templates/SubscriptionModalTemplate";

import { GUIDE } from "./constant";
import $ from "./style.module.scss";

function MajorProcess2() {
  const { collegeId } = useParams();
  const {
    data: boardMajorTree,
    isLoading,
    isError,
    breadCrumb,
  } = useCollegeBoardTree(Number(collegeId));
  if (isLoading) return <div>로딩중입니다.</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <SubscriptionModalTemplate>
      <div className={$.guide}>
        <div className={$.title}>{breadCrumb}</div>
        <div className={$.content}>{GUIDE.all_depth1}</div>
      </div>
      {boardMajorTree?.map((data) => (
        <Link to={`/subscription/major/${collegeId}/${data.id}`} key={data.id}>
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

export default MajorProcess2;
