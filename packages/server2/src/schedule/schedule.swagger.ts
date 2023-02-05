import { applyDecorators } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { MutationResponse } from "src/common/types/response";
import { UserGuard } from "src/user/user.gurad";

import { Schedule } from "./entities/schedule.entity";

export const CreateSchdule = () => {
  return applyDecorators(
    ApiOperation({
      summary: "일정 생성",
    }),
    ApiCreatedResponse({
      description: "일정이 정상적으로 생성된 경우",
      type: Schedule,
    }),
  );
};

export const GetSchedule = () => {
  return applyDecorators(
    ApiOperation({
      summary: "학사 일정 조회",
    }),
    ApiOkResponse({ type: Schedule }),
  );
};
export const BookmarkSchdule = () => {
  return applyDecorators(
    ApiOperation({
      summary: "북마크 설정",
    }),
    ApiOkResponse({ type: MutationResponse }),
    UserGuard(),
  );
};

export const UnBookmarkSchdule = () => {
  return applyDecorators(
    ApiOperation({
      summary: "북마크 해제",
    }),
    ApiOkResponse({ type: MutationResponse }),
    UserGuard(),
  );
};
