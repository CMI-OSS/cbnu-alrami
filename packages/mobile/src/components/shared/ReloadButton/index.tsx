import { Reload } from "@components/atoms/icon";
import classNames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

export type ReloadButtonProps = {
  buttonType: "text" | "icon";
  onClick: () => void;
} & DefaultProps;

function ReloadButton({ className, buttonType, onClick }: ReloadButtonProps) {
  if (buttonType === "text")
    return (
      <button
        type="button"
        onClick={onClick}
        className={classNames($["reload-button-with-text"], className)}
      >
        <Reload stroke="#9FB0C6" size={12.5} />
        <span className={$["reload-text"]}>새로고침</span>
      </button>
    );

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames($["reload-button"], className)}
    >
      <Reload stroke="#9FB0C6" size={20} />
    </button>
  );
}

export default ReloadButton;
