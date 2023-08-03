import { useLocation, useNavigate } from "react-router-dom";

import classnames from "classnames";
import { LeftArrow } from "src/components/atoms/icon";
import { DefaultProps } from "src/type/props";

import FullPageModalTemplate from "../../../components/templates/FullPageModalTemplate";
import $ from "./style.module.scss";

type Props = {
  title: string;
  right?: JSX.Element;
} & DefaultProps;

function SettingTemplate({ className, title, children, right }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (pathname === "/setting") {
      return navigate("/home");
    }
    return navigate("/setting");
  };

  return (
    <FullPageModalTemplate
      left={<LeftArrow stroke="#5e5e5e" size={16} />}
      title={title}
      right={right}
      onNavigate={handleBackClick}
    >
      <div className={classnames($["setting-template"], className)}>
        {children}
      </div>
    </FullPageModalTemplate>
  );
}

export default SettingTemplate;
