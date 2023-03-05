/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { Admin } from "@shared/swagger-api/generated/models/Admin";
import classnames from "classnames";

import $ from "./AdminList.module.scss";

interface Props {
  admins: Admin[];
  onClickPlace: (placeId: number) => void;
}

export default function AdminListView({ admins, onClickPlace }: Props) {
  return (
    <div className={$.table}>
      <div className={classnames($.row, $.header)}>
        <div className={classnames($.cell, $.id)}>ID</div>
        <div className={classnames($.cell, $.title)}>로그인ID</div>
        <div className={classnames($.cell, $.scraps)}>닉네임</div>
        <div className={classnames($.cell, $.scraps)}>권한</div>
      </div>
      {admins.map((admin) => (
        <div
          className={$.row}
          key={admin.id}
          onClick={() => onClickPlace(admin.id)}
        >
          <div className={classnames($.cell, $.id)}>{admin.id}</div>
          <div className={classnames($.cell, $.title)}>{admin.loginId}</div>
          <div className={classnames($.cell, $.scraps)}>{admin.nickname}</div>
          <div className={classnames($.cell, $.scraps)}>{admin.authoirty}</div>
        </div>
      ))}
    </div>
  );
}
