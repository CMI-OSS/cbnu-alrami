import * as React from "react";

import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  checked?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function Toggle({ checked, onClick }: Props) {
  return (
    <button
      aria-label="toggle"
      type="button"
      className={classNames($.toggle, checked ? $.on : $.off)}
      onClick={onClick}
    />
  );
}

export default Toggle;
