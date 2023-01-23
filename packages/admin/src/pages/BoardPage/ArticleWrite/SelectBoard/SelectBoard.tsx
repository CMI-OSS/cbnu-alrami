import { useState } from "react";

import { useGetAuthorityBoardsQuery } from "src/api/board";

import SelectBoardView, { Props as ViewProps } from "./SelectBoard.view";

export default function SelectBoard() {
  const [ selectedBoardId, setSelectedBoardId ] = useState("1");

  const { data: authorityBoards, isLoading } = useGetAuthorityBoardsQuery();

  if (isLoading || !authorityBoards) return null;

  const viewProps: ViewProps = {
    options: authorityBoards?.map((authorityBoard) => ({
      value: authorityBoard.id,
      text: `${authorityBoard.parent?.name} - ${authorityBoard.name}`,
    })),

    value: selectedBoardId,
    onSelectBoardView: (e) => {
      setSelectedBoardId(e.target.value);
    },
  };

  return <SelectBoardView {...viewProps} />;
}
