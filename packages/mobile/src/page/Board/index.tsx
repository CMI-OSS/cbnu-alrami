import { Link } from "react-router-dom";

import Icon from "@components/atoms/icon/Icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import BoardList from "src/page/Board/components/BoardList";
import Breadcrumb from "src/page/Board/components/Breadcrumb";
import Title from "src/page/Board/components/Title";

import $ from "./style.module.scss";

function Board() {
  return (
    <div className={$.board}>
      <FullPageModalTemplate
        left={<Icon name="back" size={14} />}
        right={
          <Link className={$.link} to="/setting/board">
            <Icon name="x" size={14} />
          </Link>
        }
      >
        <div className={$.children}>
          <Breadcrumb />
          <Title />
          <BoardList />
        </div>
      </FullPageModalTemplate>
    </div>
  );
}

export default Board;
