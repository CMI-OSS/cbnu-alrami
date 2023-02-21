import React from "react";
import { useLocation } from "react-router-dom";

import { UnSubscription } from "@components/atoms/icon";

import $ from "./style.module.scss";

export const getBoardKind = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((path) => {
    return path !== "";
  });
  const id = `${pathnames.at(-1)}`;
  if (id === "board") {
    return { kind: "전체" };
  }
  if (id[0] === "1" && id.length === 1) {
    return { kind: "단과대학" };
  }
  if (id[0] === "1" && id.length === 3) {
    return { kind: "전공" };
  }
  if (id[0] === "2" && id.length === 1) {
    return { kind: "공통" };
  }
  if (id[0] === "3" && id.length === 1) {
    return { kind: "학생회" };
  }
  return { kind: "공지사항" };
};

function Title() {
  const { kind } = getBoardKind();
  if (kind === "전체") {
    return (
      <div className={$.title}>
        어떤 공지를
        <br />
        받아볼까요?
      </div>
    );
  }
  if (kind === "공통") {
    return (
      <div className={$.title}>
        어떤 기관의 공지를
        <br />
        받아볼까요?
      </div>
    );
  }
  if (kind === "단과대학") {
    return (
      <div className={$.title}>
        재학중인 단과대학을 <br />
        선택해주세요
      </div>
    );
  }
  if (kind === "전공") {
    return (
      <div className={$.title}>
        재학중인 학과를
        <br />
        선택해주세요
      </div>
    );
  }
  if (kind === "학생회") {
    return (
      <div className={$.title}>
        어떤 학생회의 공지를
        <br />
        받아볼까요?
      </div>
    );
  }
  return (
    <div className={$.title}>
      <div className={$["icon-message"]}>
        <UnSubscription stroke="#AAAAAA" size={36} />를 터치하여
      </div>
      원하는 공지를 구독해요!
    </div>
  );
}

export default Title;
