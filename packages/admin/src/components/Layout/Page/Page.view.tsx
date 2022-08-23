import { ReactElement } from "react";

import Navigation from "src/components/Layout/Page/Navigation/Navigation.view";

import $ from "./Page.module.scss";

interface Props {
  children: ReactElement;
}

export default function PageLayout({ children }: Props) {
  return (
    <>
      <Navigation />
      <div className={$["main-container"]}>{children}</div>
    </>
  );
}
