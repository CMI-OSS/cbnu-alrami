/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateScheduleDto = {
    /**
     * 일정 내용
     */
    content: string;
    /**
     * 우선순위
     */
    priority?: number;
    /**
     * 휴일여부
     */
    isHoliday: boolean;
    /**
     * 타겟의 시작일 기준 시작범위 (query.startDateTime <= target.startDateTime)
     */
    startDateTime: string;
    /**
     * 타겟의 시작일 기준 끝범위 (target.startDateTime <= query.endDateTime)
     */
    endDateTime?: string;
};

