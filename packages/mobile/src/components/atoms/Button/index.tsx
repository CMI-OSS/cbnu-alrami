import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

function Button({ text, onClick, className }: Props) {
  return (
    <button
      type="button"
      className={classNames(className, $.button)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
