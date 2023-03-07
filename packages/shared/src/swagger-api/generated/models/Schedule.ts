/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Schedule = {
    /**
     * 아이디
     */
    id: number;
    /**
     * 생성 시간
     */
    createdDateTime: string;
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
     * query startDateTime
     */
    startDateTime: string;
    /**
     * query endDateTime
     */
    endDateTime?: string;
};

