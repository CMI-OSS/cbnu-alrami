import { Reload } from "@components/atoms/icon";
import classNames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

export type ReloadButtonProps = {
  buttonType: "text" | "icon";
  onClick: () => void;
  stroke?: string;
} & DefaultProps;

function ReloadButton({
  className,
  buttonType,
  onClick,
  stroke = "#9FB0C6",
}: ReloadButtonProps) {
  if (buttonType === "text")
    return (
      <button
        type="button"
        onClick={onClick}
        className={classNames($["reload-button-with-text"], className)}
      >
        <Reload stroke={stroke} size={12.5} />
        <span className={$["reload-text"]}>새로고침</span>
      </button>
    );

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames($["reload-button"], className)}
    >
      <Reload stroke={stroke} size={20} />
    </button>
  );
}

export default ReloadButton;
