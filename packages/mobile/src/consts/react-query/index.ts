import {
  ArticleApiService,
  CafeteriaMenu,
} from "@shared/swagger-api/generated";
import { GetParams } from "src/type/utils";

export const queryKey = {
  article: (
    params: GetParams<typeof ArticleApiService.articleControllerFindOne>,
  ) => {
    return [ "article", params ];
  },
  boardArticles: (boardId: req.Article["boardId"]) => {
    return [ "boardArticles", boardId ];
  },
  bookmarkArticles: [ "bookmarkArticles" ],
  newArticles: [ "newArticles" ],
  popularArticles: [ "popularArticles" ],
  boardTrees: [ "boardTrees" ],
  boardTree: (boardId: req.BoardTree["boardId"]) => {
    return [ "boardTree", boardId ];
  },
  bookmarkSchedules: [ "bookmarkSchedules" ],
  subscribeBoards: [ "subscribeBoards" ],
  weathers: [ "weathers" ],
  schedules: [ "schedules" ],
  todaysSchedules: [ "todaysSchedules" ],
  cafeteria: (name: CafeteriaMenu["name"], date: CafeteriaMenu["date"]) => {
    return [ "cafeteria", name, date ];
  },
  schools: [ "schools" ],
  school: (placeId: req.School["placeId"]) => {
    return [ "school", placeId ];
  },
};
