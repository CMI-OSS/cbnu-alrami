import { useState } from "react";
import { admins } from "src/__mockData__";
import { Authorities } from "src/__mockData__/admins";
import AdminCard from "../AdminCard";
import $ from "./style.module.scss";

const TABLE_HEADS = [ "ID", "닉네임", "권한", "생성일", "상세 설정 보기" ];

export default function AdminList() {
  const [ adminData, setAdminData ] = useState(admins);

  const changeAuthority = (id: number, authority: Authorities) => {
    setAdminData((pre) =>
      pre.map((admin) => {
        if (admin.id === id) return { ...admin, authority };
        return admin;
      }),
    );
  };

  const deleteAdmin = (id: number) =>
    setAdminData((pre) => pre.filter((admin) => admin.id !== id));

  const searchBoard = (id: number, board: string) => {
    const admin = adminData.find((admin) => admin.id === id);
    if (!admin) return false;
    const isExist = admin.boards.includes(board);
    return isExist;
  };

  const addBoard = (id: number, board: string) => {
    setAdminData((pre) =>
      pre.map((admin) => {
        if (admin.id === id) {
          const { boards } = admin;
          if (boards.includes(board)) return admin;
          boards.push(board);
          return { ...admin, boards };
        }
        return admin;
      }),
    );
  };

  const deleteBoard = (id: number, board: string) => {
    setAdminData((pre) =>
      pre.map((admin) => {
        if (admin.id === id) {
          const { boards } = admin;
          const newBoards = boards.filter((item) => item !== board);
          return { ...admin, boards: newBoards };
        }
        return admin;
      }),
    );
  };

  return (
    <div className={$.container}>
      <h1 className={$["main-title"]}>관리자 목록</h1>
      <h2 className={$["sub-title"]}>
        <em>{adminData.length}</em>명의 관리자가 있습니다.
      </h2>
      <ul>
        <li className={$["column-titles"]}>
          {TABLE_HEADS.map((title) => (
            <span key={title} className={$.title}>
              {title}
            </span>
          ))}
        </li>
      </ul>
      <ul>
        {adminData.map((admin) => (
          <AdminCard
            key={admin.id}
            admin={admin}
            changeAuthority={changeAuthority}
            deleteAdmin={deleteAdmin}
            className={$.card}
            addBoard={addBoard}
            searchBoard={searchBoard}
            deleteBoard={deleteBoard}
          />
        ))}
      </ul>
    </div>
  );
}
