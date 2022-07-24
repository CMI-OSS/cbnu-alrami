import { Link, useParams } from "react-router-dom";

import BorderBox from "@components/atoms/BorderBox";
import SubscriptionModalTemplate from "src/components/templates/SubscriptionModalTemplate";
import { GUIDE } from "src/page/Subscription/constant";
import $ from "src/page/Subscription/style.module.scss";

import { majorMockData } from "./MajorProcess1";

function MajorProcess2() {
  const { fullId } = useParams();
  const collegeData = majorMockData.find((data) => `${data.id}` === fullId)!;
  const majorData = collegeData.children;

  return (
    <SubscriptionModalTemplate>
      <div className={$.guide}>
        <div className={$.title}>
          전체&nbsp;&gt;&nbsp;전공&nbsp;&gt;&nbsp;{collegeData.name}
        </div>
        <div className={$.content}>{GUIDE.all_depth1}</div>
      </div>
      {majorData?.map((data) => (
        <Link to={`/subscription/major/${fullId}/${data.id}`} key={data.id}>
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
