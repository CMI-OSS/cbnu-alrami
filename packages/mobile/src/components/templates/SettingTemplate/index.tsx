import { LeftArrow } from "src/components/atoms/icon";
import { DefaultProps } from "src/type/props";

import FullPageModalTemplate from "../FullPageModalTemplate";

type Props = {
  title: string;
} & DefaultProps;

export default function SettingTemplate({ className, title, children }: Props) {
  return (
    <FullPageModalTemplate
      left={<LeftArrow color="#AAAAAA" width="16" height="16" />}
      title={title}
      className={className}
    >
      {children}
    </FullPageModalTemplate>
  );
}
