import { DefaultProps, IconProps } from "src/type/props";
import { toastSuccess } from "src/utils/toast";
import { isFromApp } from "src/utils/webview";

import { Share } from "../icon";

type Props = {
  successMsg: string;
} & IconProps &
  DefaultProps;

export default function ShareButton({
  size,
  stroke,
  className,
  successMsg,
  children,
}: Props) {
  const handleCopyClick = () => {
    if (isFromApp) {
      baseApp.postMessage(
        JSON.stringify({
          action: "copy",
          url: window.location.href,
        }),
      );
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    toastSuccess({
      message: successMsg,
    });
  };

  return (
    <button type="button" onClick={handleCopyClick} className={className}>
      <Share size={size} stroke={stroke} />
      {children}
    </button>
  );
}
