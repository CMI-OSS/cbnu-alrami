import React from "react";

import $ from "./style.module.scss";

type Props = {
  children: React.ReactNode;
};

function FullModalTemplate({ children }: Props) {
  return <div className={$.modal}>{children}</div>;
}

export default FullModalTemplate;
