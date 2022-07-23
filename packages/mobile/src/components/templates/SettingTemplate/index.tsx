import classnames from "classnames";
import SettingHeader from "src/components/molecules/SettingHeader";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  title: string;
} & DefaultProps;

export default function SettingTemplate({ className, title, children }: Props) {
  return (
    <>
      <SettingHeader title={title} />
      <main
        className={classnames($["setting-template"], className)}
        style={{ paddingTop: "70px" }}
      >
        {children}
      </main>
    </>
  );
}
