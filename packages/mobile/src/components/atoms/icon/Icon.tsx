import { StyleProps } from "src/type/props";

import * as icons from "./svg";

type Props = {
  name: keyof typeof icons;
  size?: number;
  color?: string;
} & StyleProps;

const Icon = ({
  name,
  size = 16,
  color = "#828282",
  style,
  className,
}: Props) => {
  const SVGIcon = icons[name];

  return (
    <SVGIcon style={{ width: size, color, ...style }} className={className} />
  );
};

export default Icon;
