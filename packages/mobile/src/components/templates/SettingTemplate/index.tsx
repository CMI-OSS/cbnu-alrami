import classnames from "classnames";
import { LeftArrow } from "src/components/atoms/icon";
import { DefaultProps } from "src/type/props";

import FullPageModalTemplate from "../FullPageModalTemplate";
import $ from "./style.module.scss";

type Props = {
  title: string;
} & DefaultProps;

export default function SettingTemplate({ className, title, children }: Props) {
  return (
    <FullPageModalTemplate
      left={<LeftArrow color="#AAAAAA" width="16" height="16" />}
      title={title}
    >
      <div className={classnames($["setting-template"], className)}>
        {children}
      </div>
    </FullPageModalTemplate>
  );
}
