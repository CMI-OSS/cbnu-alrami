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
        left={<LeftArrow color="#AAAAAA" />}
        right={
          <button
            type="button"
            onClick={() => navigate("/subscription/setting", { replace: true })}
          >
            <Close />
          </button>
        }
      >
        {children}
      </FullPageModalTemplate>
    </div>
  );
}

export default SubscriptionModalTemplate;
