import { applyDecorators } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from "@nestjs/swagger";
import { CommonEntity } from "src/common/entity";

import { Schedule } from "./entities/schedule.entity";

type ScheduleProperty = Record<
  Exclude<keyof Schedule, keyof CommonEntity>,
  () => PropertyDecorator
>;

export const ScheduleProperty: ScheduleProperty = {
  content: () =>
    ApiProperty({
      description: "일정 내용",
      example: "중간고사",
    }),

  priority: () =>
    ApiProperty({
      description: "우선순위",
      example: 1,
    }),

  isHoliday: () =>
    ApiProperty({
      description: "휴일여부",
      example: false,
      required: false,
    }),

  startDateTime: () =>
    ApiProperty({
      description: "일정 시작일",
      example: "2022-04-20",
    }),

  endDateTime: () =>
    ApiProperty({
      description: "일정 종료일",
      example: "2022-04-28",
      required: false,
    }),
};

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
