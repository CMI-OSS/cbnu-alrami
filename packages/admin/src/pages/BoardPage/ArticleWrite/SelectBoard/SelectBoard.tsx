import { useState } from "react";
import { useQuery } from "react-query";

import { AdminApiService } from "@shared/swagger-api/generated/services/AdminApiService";

import SelectBoardView, { Props as ViewProps } from "./SelectBoard.view";

export default function SelectBoard() {
  const [ selectedBoardId, setSelectedBoardId ] = useState("1");

  const { data: authorityBoards, isLoading } = useQuery(
    [ "boardAuthority" ],
    () => AdminApiService.adminControllerGetAuthorityBoards(),
  );
  if (isLoading || !authorityBoards) return null;

  const viewProps: ViewProps = {
    options: authorityBoards?.map((authorityBoard) => ({
      value: authorityBoard.id,
      text: `${authorityBoard.board.parent?.name} - ${authorityBoard.board.name}`,
    })),

    value: selectedBoardId,
    onSelectBoardView: (e) => {
      setSelectedBoardId(e.target.value);
    },
  };

  return <SelectBoardView {...viewProps} />;
}
