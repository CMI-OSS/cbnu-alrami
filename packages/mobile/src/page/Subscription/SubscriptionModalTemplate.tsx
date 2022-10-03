import { useLocation, useNavigate } from "react-router-dom";

import { Close, LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";

import $ from "./style.module.scss";

type Props = {
  children: React.ReactNode;
};

function SubscriptionModalTemplate({ children }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClose = () => {
    navigate(
      pathname?.includes("setting") ? "/setting/subscription" : "/notice",
      { replace: true },
    );
  };

  return (
    <div className={$["subscription-modal"]}>
      <FullPageModalTemplate
        left={<LeftArrow stroke="#AAAAAA" size={16} />}
        right={
          <button type="button" onClick={handleClose}>
            <Close stroke="#aaa" size={14} />
          </button>
        }
      >
        <div className={$.children}>{children}</div>
      </FullPageModalTemplate>
    </div>
  );
}

export default SubscriptionModalTemplate;
