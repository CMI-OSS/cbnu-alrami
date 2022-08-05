import { Link, useLocation } from "react-router-dom";

import BorderBox from "@components/atoms/BorderBox";
import { useCollegeBoardTree } from "src/api/boardTree";
import { GUIDE } from "src/page/Subscription/constant";
import $ from "src/page/Subscription/style.module.scss";

import SubscriptionModalTemplate from "./SubscriptionModalTemplate";

function College() {
  const { data: collegeBoardTree, breadCrumb } = useCollegeBoardTree();
  const { pathname } = useLocation();
  return (
    <SubscriptionModalTemplate>
      <div className={$.guide}>
        <div className={$.title}>{breadCrumb}</div>
        <div className={$.content}>{GUIDE.all_depth1}</div>
      </div>
      {collegeBoardTree?.children.map((college) => {
        return (
          <Link to={`${pathname}/${college.id}`} key={college.id}>
            <BorderBox
              height={87}
              background="#F6F5FB"
              style={{ marginBottom: "12px" }}
            >
              <div className={$["subscription-box-base"]}>
                <span className={$.title}>{college.name}</span>
              </div>
            </BorderBox>
          </Link>
        );
      })}
    </SubscriptionModalTemplate>
  );
}

export default College;
