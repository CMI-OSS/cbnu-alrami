import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { AdminApiService } from "@shared/swagger-api/generated/services/AdminApiService";
import { Select } from "antd";

interface Props {
  boardId?: number;
  onSelectBoard?: (boardId: number) => unknown;
}

export default function SelectBoard({ boardId, onSelectBoard }: Props) {
  const [ selectedBoardId, setSelectedBoardId ] = useState<number | undefined>(
    undefined,
  );

  const { data: authorityBoards, isLoading } = useQuery(
    [ "boardAuthority" ],
    () => AdminApiService.adminControllerGetAuthorityBoards(),
    {
      onSuccess: (boards) => {
        setSelectedBoardId(boardId ?? boards[0].board.id);
      },
    },
  );

  useEffect(() => {
    if (selectedBoardId) {
      const authorityBoard = authorityBoards?.find(
        (ab) => ab.board.id === selectedBoardId,
      );
      if (authorityBoard) onSelectBoard?.(authorityBoard.board.id);
    }
  }, [ selectedBoardId ]);

  if (isLoading || !authorityBoards) return null;

  const options = authorityBoards?.map((authorityBoard) => ({
    value: authorityBoard.board.id,
    label: `${authorityBoard.board.parent?.name ?? ""} - ${
      authorityBoard.board.name
    }`,
  }));

  return (
    <Select
      onChange={onSelectBoard}
      value={selectedBoardId as any}
      options={options}
    />
  );
}
