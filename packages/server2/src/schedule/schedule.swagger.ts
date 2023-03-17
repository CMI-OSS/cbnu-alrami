import { applyDecorators } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  PartialType,
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
      description: `범위안에 해당하는 일정을 조회합니다. \n (시작일 기준으로 오름차순 정렬) <br/> 
<--- target ---><br/> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<--- target ---><br/> 
&nbsp;&nbsp;<---- target ---->    <br/>
&nbsp;&nbsp;&nbsp;&nbsp;<--- query --->
      `,
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

class PartialSchdule extends PartialType(Schedule) {}

export const IsHolidaySchedule = () => {
  return applyDecorators(
    ApiOperation({
      summary: "휴일 일정이 있는지 조회",
    }),
    ApiParam({ type: String, name: "date", example: "2023-03-01" }),
    ApiOkResponse({ type: PartialSchdule }),
  );
};
