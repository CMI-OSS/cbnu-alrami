import { useNavigate } from "react-router-dom";

import classnames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  left: JSX.Element;
  title?: string;
  right?: JSX.Element;
} & DefaultProps;

function FullPageModalTemplate({
  left,
  title,
  right,
  children,
  className,
}: Props) {
  const navigate = useNavigate();

  return (
    <>
      <header className={$.header}>
        <button type="button" className={$.left} onClick={() => navigate(-1)}>
          {left}
        </button>
        <div className={$.title}>{title}</div>
        <div className={$.right}>{right}</div>
      </header>

      <div
        className={classnames($["full-modal"], className)}
        style={{ paddingTop: "60px" }}
      >
        {children}
      </div>
    </>
  );
}

export default FullPageModalTemplate;
