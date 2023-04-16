import { Link } from "react-router-dom";

import { Plus } from "@components/atoms/icon";
import ErrorFallbackWithStyle from "src/components/atoms/ErrorFallbackWithStyle";
import SuspenseFallback from "src/components/atoms/SuspenseFallback";
import AsyncBoundary from "src/components/templates/AsyncBoundary";
import SettingTemplate from "src/page/Setting/SettingTemplate";

import SettingBoardBody from "./components/SettingBoardBody";
import $ from "./style.module.scss";

function Board() {
  return (
    <SettingTemplate
      title="구독/알림"
      right={
        <Link to="/board">
          <Plus size={16} stroke="#AAAAAA" />
        </Link>
      }
    >
      <AsyncBoundary
        suspenseFallback={<SuspenseFallback className={$["body-height"]} />}
        errorFallback={ErrorFallbackWithStyle({ className: $["body-height"] })}
      >
        <SettingBoardBody />
      </AsyncBoundary>
    </SettingTemplate>
  );
}

export default Board;
