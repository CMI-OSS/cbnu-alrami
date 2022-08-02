import { Link, useLocation, useParams } from "react-router-dom";

import { useMajorBoardTree } from "src/api/boardTree";
import BorderBox from "src/components/atoms/BorderBox";

import { GUIDE } from "./constant";
import $ from "./style.module.scss";
import SubscriptionModalTemplate from "./SubscriptionModalTemplate";

function Major() {
  const { collegeId } = useParams();
  const { data: majorBoardTree, breadCrumb } = useMajorBoardTree(
    Number(collegeId),
  );
  const { pathname } = useLocation();

  return (
    <SubscriptionModalTemplate>
      <div className={$.guide}>
        <div className={$.title}>{breadCrumb}</div>
        <div className={$.content}>{GUIDE.all_depth1}</div>
      </div>
      {majorBoardTree?.map((major) => (
        <Link to={`${pathname}/${major.id}`} key={major.id}>
          <BorderBox
            height={87}
            background="#F6F5FB"
            style={{ marginBottom: "12px" }}
          >
            <div className={$["subscription-box-base"]}>
              <span className={$.title}>{major.name}</span>
            </div>
          </BorderBox>
        </Link>
      ))}
    </SubscriptionModalTemplate>
  );
}

export default Major;
