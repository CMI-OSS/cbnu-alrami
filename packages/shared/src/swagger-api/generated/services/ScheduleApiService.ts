/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateScheduleDto } from '../models/CreateScheduleDto';
import type { Schedule } from '../models/Schedule';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ScheduleApiService {

    /**
     * 일정 생성
     * @returns Schedule 일정이 정상적으로 생성된 경우
     * @throws ApiError
     */
    public static scheduleControllerCreate({
        requestBody,
    }: {
        requestBody: CreateScheduleDto,
    }): CancelablePromise<Schedule> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schedule',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 학사 일정 조회
     * @returns Schedule
     * @throws ApiError
     */
    public static scheduleControllerFindAll({
        startDateTime = '2022-04-01',
        endDateTime = '2022-06-30',
    }: {
        /**
         * 일정 시작일
         */
        startDateTime?: string | null,
        /**
         * 일정 종료일
         */
        endDateTime?: string | null,
    }): CancelablePromise<Schedule[]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedule',
            query: {
                'startDateTime': startDateTime,
                'endDateTime': endDateTime,
            },
        });
    }

}
