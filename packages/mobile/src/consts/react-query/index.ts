import {
  ArticleApiService,
  BoardApiService,
  CafeteriaMenu,
  PlaceApiService,
} from "@shared/swagger-api/generated";
import { GetParams } from "src/type/utils";

export const queryKey = {
  // article 도메인
  popularArticles: () => {
    return [ "popularArticles" ];
  },
  subscribeArticles: (
    params?: GetParams<
      typeof ArticleApiService.articleControllerFindSubscribeArticle
    >,
  ) => {
    return [ "subscribeArticles", params ];
  },
  bookmarkArticles: () => {
    return [ "bookmarkArticles" ];
  },
  article: (
    params: GetParams<typeof ArticleApiService.articleControllerFindOne>,
  ) => {
    return [ "article", params ];
  },
  // board 도메인
  boardArticles: (
    params: GetParams<typeof BoardApiService.boardControllerFindArticlePage>,
  ) => {
    return [ "boardArticles", params ];
  },
  subscribeBoards: [ "subscribeBoards" ],
  boards: (params: GetParams<typeof BoardApiService.boardControllerFind>) => {
    return [ "boards", params ];
  },
  board: (params: GetParams<typeof BoardApiService.boardControllerFindOne>) => {
    return [ "board", params ];
  },

  bookmarkSchedules: [ "bookmarkSchedules" ],
  weathers: [ "weathers" ],
  schedules: [ "schedules" ],
  todaysSchedules: [ "todaysSchedules" ],
  cafeteria: (
    name: CafeteriaMenu["name"] | string,
    date: CafeteriaMenu["date"],
  ) => {
    return [ "cafeteria", name, date ];
  },
  schools: (
    params: GetParams<typeof PlaceApiService.placeControllerFindSchool>,
  ) => {
    return [ "schools", params ];
  },
  school: (
    params: GetParams<typeof PlaceApiService.placeControllerFindOneSchool>,
  ) => {
    return [ "school", params ];
  },
};
