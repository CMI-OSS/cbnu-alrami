import { IconProps, StyleProps } from "src/type/props";
import { toastSuccess } from "src/utils/toast";
import { isFromApp } from "src/utils/webview";

import { Share } from "../icon";

type Props = {
  successMsg: string;
  text?: JSX.Element;
} & IconProps &
  StyleProps;

export default function ShareButton({
  size,
  stroke,
  className,
  successMsg,
  text,
}: Props) {
  const handleCopyClick = () => {
    if (isFromApp) {
      baseApp.postMessage(window.location.href);
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    toastSuccess({
      message: successMsg,
      style: { marginBottom: "58px" },
    });
  };

  return (
    <button type="button" onClick={handleCopyClick} className={className}>
      <Share size={size} stroke={stroke} />
      {text}
    </button>
  );
}
