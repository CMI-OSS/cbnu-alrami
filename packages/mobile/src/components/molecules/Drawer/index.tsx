import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import Icon from "@components/atoms/icon/Icon";
import Toggle from "@components/atoms/Toggle";
import {
  useNoticeBoardMutation,
  useSubscribeBoardMutation,
  useUnNoticeBoardMutation,
  useUnSubscribeBoardMutation,
} from "@hooks/api/board";

import $ from "./style.module.scss";

type Props = {
  id: number;
  to: string;
  isSubscribe: boolean;
  isNotice: boolean;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

function createDrawerPortal() {
  const drawerRoot = document.createElement("div");
  drawerRoot.setAttribute("id", "drawer-root");
  return drawerRoot;
}

function Drawer({ id, to, isSubscribe, isNotice, isOpen, setIsOpen }: Props) {
  const portalRootRef = useRef<HTMLDivElement>(
    (document.getElementById("drawer-root") as HTMLDivElement) ||
      createDrawerPortal(),
  );
  const bodyRef = useRef<HTMLBodyElement | null>(null);
  const postSubscribeBoard = useSubscribeBoardMutation({ id });
  const deleteSubscribeBoard = useUnSubscribeBoardMutation({ id });
  const postNoticeBoard = useNoticeBoardMutation({ id });
  const deleteNoticeBoard = useUnNoticeBoardMutation({ id });

  useEffect(() => {
    bodyRef.current = document.querySelector("body");

    if (bodyRef.current) {
      const portal = portalRootRef.current!;
      bodyRef.current.appendChild(portal);
    }
  }, []);

  const handleSubscribeClick = () => {
    if (isSubscribe) {
      deleteSubscribeBoard.mutate({ id });
      setIsOpen(false);
      return;
    }

    postSubscribeBoard.mutate({ id });
  };

  const handleNoticeClick = () => {
    if (isNotice) {
      deleteNoticeBoard.mutate({ id });
      return;
    }

    postNoticeBoard.mutate({ id });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return <></>;
  }

  return createPortal(
    <div className={$["drawer-wrapper"]}>
      <button
        aria-label="background"
        type="button"
        className={$.background}
        onClick={handleClose}
      />
      <div className={$.drawer}>
        <div className={$.item}>
          <div className={$.title}>
            <Icon name="subscribe" size={20} />
            구독
          </div>
          <Toggle checked={isSubscribe} onClick={handleSubscribeClick} />
        </div>
        {isSubscribe && (
          <div className={$.item}>
            <div className={$.title}>
              <Icon name="alarm" size={20} />
              알림
            </div>
            <Toggle checked={isNotice} onClick={handleNoticeClick} />
          </div>
        )}

        <Link className={$.item} to={to}>
          <div className={$.title}>
            <Icon name="view" size={20} />
            공지사항 보기
          </div>
        </Link>
      </div>
    </div>,
    portalRootRef.current,
  );
}

export default Drawer;
