import { useNavigate } from "react-router-dom";

import { Close, LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";

import $ from "./style.module.scss";

type Props = {
  children: React.ReactNode;
};

function SubscriptionModalTemplate({ children }: Props) {
  const navigate = useNavigate();

  return (
    <div className={$.modal}>
      <FullPageModalTemplate
        left={<LeftArrow color="#AAAAAA" width="16" height="16" />}
        right={
          <button
            type="button"
            onClick={() => {
              return navigate("/subscription/setting", { replace: true });
            }}
          >
            <Close />
          </button>
        }
      >
        <div className={$.children}>{children}</div>
      </FullPageModalTemplate>
    </div>
  );
}

export default SubscriptionModalTemplate;
