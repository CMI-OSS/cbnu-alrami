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
  );

  useEffect(() => {
    if (authorityBoards) {
      if (boardId) {
        setSelectedBoardId(boardId);
        onSelectBoard?.(boardId);
      } else {
        const { id } = authorityBoards[0];
        setSelectedBoardId(id);
        onSelectBoard?.(id);
      }
    }
  }, [ authorityBoards, boardId ]);

  useEffect(() => {
    if (selectedBoardId) {
      onSelectBoard?.(selectedBoardId);
    }
  }, [ selectedBoardId ]);

  if (isLoading || !authorityBoards) return null;

  const options = authorityBoards?.map((board) => ({
    value: board.id,
    label: `${board.parent?.name ? `${board.parent?.name} > ` : ""} ${
      board.name
    }`,
  }));

  return (
    <Select
      style={{ width: 250 }}
      onChange={setSelectedBoardId}
      value={selectedBoardId as any}
      options={options}
    />
  );
}
