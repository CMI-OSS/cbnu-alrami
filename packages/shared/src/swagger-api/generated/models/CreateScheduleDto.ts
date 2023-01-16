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
    priority: number;
    /**
     * 휴일여부
     */
    isHoliday?: boolean;
    /**
     * 일정 시작일
     */
    startDateTime: string;
    /**
     * 일정 종료일
     */
    endDateTime?: string;
};

