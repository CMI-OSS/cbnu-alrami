import { Reload } from "@components/atoms/icon";
import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  className?: string;
  buttonType: "text" | "icon";
  onClick: () => void;
};

function ReloadButton({ className, buttonType, onClick }: Props) {
  return buttonType === "text" ? (
    <button
      type="button"
      onClick={onClick}
      className={classNames($["reload-button-with-text"], className)}
    >
      <Reload stroke="#9FB0C6" size={12.5} />
      <span className={$["reload-text"]}>새로고침</span>
    </button>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={classNames($["reload-button"], className)}
    >
      <Reload stroke="#9FB0C6" size={18} />
    </button>
  );
}

export default ReloadButton;
