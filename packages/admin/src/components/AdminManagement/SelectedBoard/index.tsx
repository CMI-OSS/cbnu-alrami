import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { MdCancel } from "react-icons/md";
import { Admin } from "../AdminCard";
import $ from "./style.module.scss";

type Props = {
  id: number;
  title: string;
  className: string;
  onAdminChange: Dispatch<SetStateAction<Array<Admin>>>;
};

export default function SelectedBoard({
  id,
  title,
  className,
  onAdminChange,
}: Props) {
  function deleteBoard() {
    onAdminChange((pre) =>
      pre.map((admin) => {
        if (admin.id === id) {
          const { boards } = admin;
          const newBoards = boards.filter((board) => board !== title);
          return { ...admin, boards: newBoards };
        }
        return admin;
      }),
    );
  }

  return (
    <li className={classNames($.container, className)}>
      <span>{title}</span>
      <button
        className={$["delete-button"]}
        type="button"
        onClick={deleteBoard}
      >
        <MdCancel />
      </button>
    </li>
  );
}
