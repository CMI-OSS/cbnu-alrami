import classnames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

function ImageSlider({ className, children }: DefaultProps) {
  return (
    <div className={classnames($["image-slider"], className)}>{children}</div>
  );
}

export default ImageSlider;
