import { ReactElement } from "react";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import { MdReplay } from "react-icons/md";

import classnames from "classnames";

import $ from "./RemoteController.module.scss";

export interface Props {
  children?: ReactElement;
  onClickStart: () => any;
  disableStart: boolean;
  onClickPause: () => any;
  disablePause: boolean;
  onClickStop: () => any;
  disableStop: boolean;
  onClickRestart: () => any;
  disableRestart: boolean;
}

export default function RemoteControllerView({
  children,
  onClickStart,
  disableStart,
  onClickPause,
  disablePause,
  onClickStop,
  disableStop,
  onClickRestart,
  disableRestart,
}: Props) {
  return (
    <section className={$.container}>
      <article className={$["manager-header"]}>
        <div>
          <button type="button" onClick={onClickStart}>
            <FaPlay
              className={classnames($.play, { [$.disabled]: disableStart })}
            />
            <span>스크래퍼 시작</span>
          </button>

          <button type="button" onClick={onClickPause}>
            <FaPause
              className={classnames($.pause, { [$.disabled]: disablePause })}
            />
            <span>스크래퍼 일시정지</span>
          </button>

          <button type="button" onClick={onClickStop}>
            <FaStop
              className={classnames($.stop, { [$.disabled]: disableStop })}
            />
            <span>스크래퍼 정지</span>
          </button>

          <button type="button" onClick={onClickRestart}>
            <MdReplay
              className={classnames($.replay, { [$.disabled]: disableRestart })}
            />
            <span>스크래퍼 다시시작</span>
          </button>
        </div>
      </article>
      <article className={$["manager-container"]}>{children}</article>
    </section>
  );
}
