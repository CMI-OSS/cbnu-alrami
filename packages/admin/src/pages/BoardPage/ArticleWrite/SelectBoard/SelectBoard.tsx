import { useState } from "react";

import SelectBoardView, { Props as ViewProps } from "./SelectBoard.view";

export default function SelectBoard() {
  const [ selectedBoardId, setSelectedBoardId ] = useState("1");

  const viewProps: ViewProps = {
    options: [
      { value: "1", text: "총학생회" },
      { value: "2", text: "컴퓨터공학과" },
      { value: "3", text: "소프트웨어학과" },
    ],
    value: selectedBoardId,
    onSelectBoardView: (e) => {
      setSelectedBoardId(e.target.value);
    },
  };

  return <SelectBoardView {...viewProps} />;
}
