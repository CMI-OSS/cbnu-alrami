import { ChangeEvent, useState } from "react";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";

import classNames from "classnames";
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
  className: string;
  changeAuthority: (id: number, authortiy: Authorities) => void;
  deleteAdmin: (id: number) => void;
  addBoard: (id: number, board: string) => void;
  searchBoard: (id: number, board: string) => boolean;
  deleteBoard: (id: number, board: string) => void;
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
  changeAuthority,
  deleteAdmin,
  addBoard,
  searchBoard,
  deleteBoard,
  className,
}: Props) {
  const [ isDetailHidden, setIsDetailHidden ] = useState(true);
  const [ preSelectedBoard, setPreSelectedBoard ] = useState("");
  const [ isHiddenConfirmButton, setIsHiddenConfirmButton ] = useState(true);

  function handleAuthorityChange(event: ChangeEvent<HTMLSelectElement>) {
    const {
      target: { value },
    } = event;
    changeAuthority(id, parseInt(value, 10));
  }

  function handleBoardSelected(event: ChangeEvent<HTMLSelectElement>) {
    const {
      target: { value },
    } = event;

    const isExist = searchBoard(id, value);
    if (isExist) {
      setPreSelectedBoard(value);
      setTimeout(() => {
        return setPreSelectedBoard("");
      }, 200);
      return;
    }
    addBoard(id, value);
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
          onClick={() => {
            return setIsDetailHidden((pre) => {
              return !pre;
            });
          }}
          aria-label={`상세 설정 페이지 ${isDetailHidden ? "보기" : "닫기"}`}
        >
          {isDetailHidden ? <BsArrowBarDown /> : <BsArrowBarUp />}
        </button>
      </div>
      <div
        className={classNames(
          $["admin-hidden-container"],
          isDetailHidden && $.hidden,
        )}
      >
        <hr className={$["split-line"]} />
        <h3 className={$["editor-title"]}>권한 수정</h3>
        <label htmlFor="authority-selector">
          권한
          <select
            className={$.selector}
            id="authority-selector"
            value={authority}
            onChange={handleAuthorityChange}
          >
            {AUTHORITY_OPTIONS.map((option, index) => {
              return (
                <option key={option} value={index}>
                  {option}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="board-selector">
          관리 보드 추가
          <select
            className={$.selector}
            id="board-selector"
            value="선택"
            onChange={handleBoardSelected}
          >
            {[ "선택", ...BOARDS ].map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </label>
        <h3 className={$["editor-title"]}>관리중인 보드</h3>
        <ul className={$["selected-board-container"]}>
          {boards.map((board) => {
            return (
              <SelectedBoard
                key={board}
                id={id}
                title={board}
                className={classNames(
                  $["selected-board"],
                  preSelectedBoard === board && $.alert,
                )}
                deleteBoard={deleteBoard}
              />
            );
          })}
        </ul>
        <h3 className={$["editor-title"]}>위험한 설정</h3>
        {isHiddenConfirmButton ? (
          <button
            className={classNames($["delete-admin-button"], $["delete-button"])}
            type="button"
            onClick={() => {
              return setIsHiddenConfirmButton((pre) => {
                return !pre;
              });
            }}
            aira-label="관리자 삭제하기"
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
              onClick={() => {
                return deleteAdmin(id);
              }}
              aria-label="관리자 정말로 삭제하기"
            >
              정말로 삭제하시겠습니까?
            </button>
            <button
              type="button"
              className={classNames(
                $["delete-button"],
                $["cancel-delete-button"],
              )}
              onClick={() => {
                return setIsHiddenConfirmButton((pre) => {
                  return !pre;
                });
              }}
              aira-label="관리자 삭제 그만두기"
            >
              취소
            </button>
          </>
        )}
      </div>
    </li>
  );
}
