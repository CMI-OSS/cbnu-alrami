import toast from "react-hot-toast";

import { StyleProps } from "src/type/props";

type Props = {
  message: string;
} & StyleProps;

export const toastSuccess = ({ message, style }: Props) => {
  toast.success(message, {
    icon: null,
    style: { background: "#363636", color: "#fff", ...style },
  });
};
