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
  return (
    <FullPageModalTemplate
      left={<LeftArrow stroke="#AAAAAA" size={16} />}
      title={title}
      right={right}
    >
      <div className={classnames($["setting-template"], className)}>
        {children}
      </div>
    </FullPageModalTemplate>
  );
}

export default SettingTemplate;
