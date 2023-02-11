import { applyDecorators } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { MutationResponse } from "src/common/types/response";
import { UserGuard } from "src/user/user.gurad";

import { Schedule } from "./entities/schedule.entity";

export const CreateSchedule = () => {
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
      summary: "일정 조회",
      description:
        "타겟의 시작일을 기준으로 시작범위와 끝범위를 설정하여 일정을 조회합니다. \n (시작일 기준으로 오름차순 정렬) <br/> query.startDateTime <= target.startDateTime <= query.endDateTime",
    }),
    ApiOkResponse({ type: Schedule, isArray: true }),
  );
};

export const GetBookmarkSchedule = () => {
  return applyDecorators(
    ApiOperation({
      summary: "북마크한 일정 조회",
    }),
    ApiOkResponse({ type: Schedule, isArray: true }),
  );
};

export const BookmarkSchedule = () => {
  return applyDecorators(
    ApiOperation({
      summary: "북마크 설정",
    }),
    ApiOkResponse({ type: MutationResponse }),
    UserGuard(),
  );
};

export const UnBookmarkSchedule = () => {
  return applyDecorators(
    ApiOperation({
      summary: "북마크 해제",
    }),
    ApiOkResponse({ type: MutationResponse }),
    UserGuard(),
  );
};
