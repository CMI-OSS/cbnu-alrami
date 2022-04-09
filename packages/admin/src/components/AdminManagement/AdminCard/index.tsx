import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import classNames from "classnames";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";
import { Authorities } from "src/__mockData__/admins";
import SelectedBoard from "../SelectedBoard";
import $ from "./style.module.scss";

export type Admin = {
  id: number;
  name: string;
  authority: Authorities;
  createdDate: string;
  boards: Array<string>;
};

type Props = {
  admin: Admin;
  onAdminChange: Dispatch<SetStateAction<Array<Admin>>>;
  className: string;
};

const AUTHORITY_OPTIONS = [ "super", "council" ];
const BOARDS = [
  "심리학과 학생회 공지",
  "소프트웨어학과 학생회 공지",
  "경영대학 학생회 공지",
  "총학생회 공지",
  "CMI 공지",
];

export default function AdminCard({
  admin: { id, authority, boards, name, createdDate },
  onAdminChange,
  className,
}: Props) {
  const [ isDetailHidden, setIsDetailHidden ] = useState(true);
  const [ preSelectedBoard, setPreSelectedBoard ] = useState("");
  const [ isHiddenConfirmButton, setIsHiddenConfirmButton ] = useState(true);

  function onAutorityChange(event: ChangeEvent<HTMLSelectElement>) {
    const {
      target: { value },
    } = event;

    onAdminChange((pre) =>
      pre.map((admin) => {
        if (admin.id === id)
          return { ...admin, authority: parseInt(value, 10) };
        return admin;
      }),
    );
  }

  function addBoard(event: ChangeEvent<HTMLSelectElement>) {
    const {
      target: { value },
    } = event;

    onAdminChange((pre) =>
      pre.map((admin) => {
        if (admin.id === id) {
          const { boards } = admin;
          if (boards.includes(value)) {
            setPreSelectedBoard(value);
            setTimeout(() => setPreSelectedBoard(""), 500);
            return admin;
          }
          boards.push(value);
          return { ...admin, boards };
        }
        return admin;
      }),
    );
  }

  function deleteAdmin() {
    onAdminChange((pre) => pre.filter((admin) => admin.id !== id));
  }

  return (
    <li className={classNames($.container, className)}>
      <div className={$["admin-preview"]}>
        <div className={$.cell}>
          <span>#{id}</span>
        </div>
        <div className={$.cell}>
          <span>{name}</span>
        </div>
        <div className={$.cell}>
          <span
            className={authority === Authorities.Super ? $["super-user"] : ""}
          >
            {authority === Authorities.Super ? "super" : "council"}
          </span>
        </div>
        <div className={$.cell}>
          <span>{createdDate}</span>
        </div>
        <button
          type="button"
          className={$["show-detail-button"]}
          onClick={() => setIsDetailHidden((pre) => !pre)}
        >
          {isDetailHidden ? <BsArrowBarDown /> : <BsArrowBarUp />}
        </button>
      </div>
      <div
        className={classNames(
          $["admin-hidden-container"],
          isDetailHidden ? $.hidden : "",
        )}
      >
        <hr className={$["split-line"]} />
        <h2 className={$["editor-title"]}>권한 수정</h2>
        <label htmlFor="authority-selector" className={className}>
          권한
          <select
            className={$.selector}
            id="authority-selector"
            value={authority}
            onChange={onAutorityChange}
          >
            {AUTHORITY_OPTIONS.map((option, index) => (
              <option key={option} value={index}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="board-selector" className={className}>
          관리 보드 추가
          <select
            className={$.selector}
            id="board-selector"
            value="선택"
            onChange={addBoard}
          >
            {[ "선택", ...BOARDS ].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <h2 className={$["editor-title"]}>관리중인 보드</h2>
        <ul className={$["selected-board-container"]}>
          {boards.map((board) => (
            <SelectedBoard
              key={board}
              id={id}
              title={board}
              className={classNames(
                $["selected-board"],
                preSelectedBoard === board ? $.alert : "",
              )}
              onAdminChange={onAdminChange}
            />
          ))}
        </ul>
        <h2 className={$["editor-title"]}>위험한 설정</h2>
        {isHiddenConfirmButton ? (
          <button
            className={classNames($["delete-admin-button"], $["delete-button"])}
            type="button"
            onClick={() => setIsHiddenConfirmButton((pre) => !pre)}
          >
            관리자 삭제
          </button>
        ) : (
          <>
            <button
              className={classNames(
                $["delete-confirm-button"],
                $["delete-button"],
              )}
              type="button"
              onClick={deleteAdmin}
            >
              정말로 삭제하시겠습니까?
            </button>
            <button
              type="button"
              className={classNames(
                $["delete-button"],
                $["cancel-delete-button"],
              )}
              onClick={() => setIsHiddenConfirmButton((pre) => !pre)}
            >
              취소
            </button>
          </>
        )}
      </div>
    </li>
  );
}
