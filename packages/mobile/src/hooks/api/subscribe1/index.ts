import { useCoreQuery } from "@hooks/api/core";
import { BoardApiService } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query";
import { GetParams } from "src/type/utils";

export const useArticleSubscribeBoardsQuery = (
  params: GetParams<typeof BoardApiService.boardControllerFindSubscribeBoards>,
) => {
  return useCoreQuery(
    queryKey.subscribeBoards,
    () => {
      return BoardApiService.boardControllerFindSubscribeBoards(params);
    },
    {
      select: (data) => {
        const nextData = data.map((indiData) => {
          const { id, name, parent } = indiData;
          return {
            id,
            name: parent?.name ? `${parent?.name} > ${name}` : name,
          };
        });
        return nextData;
      },
    },
  );
};
