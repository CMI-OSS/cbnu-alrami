import { MdCancel } from "react-icons/md";

import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  id: number;
  title: string;
  className: string;
  deleteBoard: (id: number, board: string) => void;
};

export default function SelectedBoard({
  id,
  title,
  className,
  deleteBoard,
}: Props) {
  return (
    <li className={classNames($.container, className)}>
      <span>{title}</span>
      <button
        className={$["delete-button"]}
        type="button"
        onClick={() => {
          return deleteBoard(id, title);
        }}
        aria-label="보드 관리 권한 없애기"
      >
        <MdCancel />
      </button>
    </li>
  );
}
