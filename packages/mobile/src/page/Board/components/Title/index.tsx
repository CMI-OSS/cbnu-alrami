import React from "react";
import { useLocation } from "react-router-dom";

import { Subscription } from "@components/atoms/icon";

import $ from "./style.module.scss";

export const getBoardKind = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((path) => {
    return path !== "";
  });
  const id = Number(pathnames.at(-1));

  if (pathnames.length === 1) {
    return { kind: "전체" };
  }
  if (pathnames.length === 3 && pathname[1] === "1") {
    return { id, kind: "전공" };
  }
  if (pathnames.length === 2 && pathnames[1] === "1") {
    return { id, kind: "단과대학" };
  }
  if (pathnames[1] === "2") {
    return { id, kind: "공통" };
  }
  if (pathnames[1] === "3") {
    return { id, kind: "학생회" };
  }
  return { id, kind: "공지사항" };
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
      <Subscription size={20} />를 터치하여
      <br />
      원하는 공지를 구독해요!
    </div>
  );
}

export default Title;
