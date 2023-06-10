import { Link, useLocation } from "react-router-dom";

import { Close, LeftArrow } from "@components/atoms/icon";
import Drawer from "@components/molecules/Drawer";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import BoardList from "src/page/Board/components/BoardList";
import Breadcrumb from "src/page/Board/components/Breadcrumb";
import Title from "src/page/Board/components/Title";

import $ from "./style.module.scss";

function Board() {
  const { pathname } = useLocation();
  const isFirst = pathname.split("/").at(-1) === "board";

  return (
    <div className={$.board}>
      <FullPageModalTemplate
        left={<LeftArrow size={16} />}
        right={
          <Link className={$.link} to="/setting/board">
            <Close size={16} />
          </Link>
        }
      >
        <div className={$.children}>
          <Breadcrumb />
          <Title />
          <BoardList />
          <Drawer />
        </div>
      </FullPageModalTemplate>
    </div>
  );
}

export default Board;
