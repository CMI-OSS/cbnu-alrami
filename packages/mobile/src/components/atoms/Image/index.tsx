import classNames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  src: string;
  alt: string;
} & DefaultProps;

function Image({ className, src, alt }: Props) {
  return <img className={classNames($.image, className)} {...{ src, alt }} />;
}

export default Image;
