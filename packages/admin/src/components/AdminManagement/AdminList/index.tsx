import { useState } from "react";
import { admins } from "src/__mockData__";
import AdminCard from "../AdminCard";
import $ from "./style.module.scss";

const TABLE_HEADS = [ "ID", "닉네임", "권한", "생성일", "상세 설정 보기" ];

export default function AdminList() {
  const [ adminData, setAdminData ] = useState(admins);

  return (
    <div className={$.container}>
      <h1 className={$["main-title"]}>관리자 목록</h1>
      <h2 className={$["sub-title"]}>
        {adminData.length}명의 관리자가 있습니다.
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
            onAdminChange={setAdminData}
            className={$.card}
          />
        ))}
      </ul>
    </div>
  );
}
