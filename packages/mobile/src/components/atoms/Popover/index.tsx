import React, { ComponentProps } from "react";

import Tooltip from "rc-tooltip";
import { DefaultProps } from "src/type/props";
import "rc-tooltip/assets/bootstrap_white.css";

type Props = Partial<ComponentProps<typeof Tooltip>> & DefaultProps;
function Popover({
  children,
  placement,
  overlay,
  trigger,
  showArrow = false,
}: Props) {
  return (
    <Tooltip
      {...{ placement, overlay, trigger, showArrow }}
      destroyTooltipOnHide
    >
      {children}
    </Tooltip>
  );
}

export default Popover;
