/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateScheduleDto } from '../models/CreateScheduleDto';
import type { MutationResponse } from '../models/MutationResponse';
import type { PartialSchdule } from '../models/PartialSchdule';
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
     * 일정 조회
     * 범위안에 해당하는 일정을 조회합니다.
     * (시작일 기준으로 오름차순 정렬) <br/>
     * <--- target ---><br/>
     * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<--- target ---><br/>
     * &nbsp;&nbsp;<---- target ---->    <br/>
     * &nbsp;&nbsp;&nbsp;&nbsp;<--- query --->
     *
     * @returns Schedule
     * @throws ApiError
     */
    public static scheduleControllerFindAll({
        startDateTime = '2023-04-01',
        endDateTime = '2023-05-01',
    }: {
        /**
         * query startDateTime
         */
        startDateTime?: string,
        /**
         * query endDateTime
         */
        endDateTime?: string,
    }): CancelablePromise<Array<Schedule>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedule',
            query: {
                'startDateTime': startDateTime,
                'endDateTime': endDateTime,
            },
        });
    }

    /**
     * 북마크한 일정 조회
     * @returns Schedule
     * @throws ApiError
     */
    public static scheduleControllerFindBookmarkSchedule({
        uuid,
    }: {
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<Array<Schedule>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedule/bookmark',
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 북마크 설정
     * @returns MutationResponse
     * @throws ApiError
     */
    public static scheduleControllerBookmark({
        id,
        uuid,
    }: {
        id: number,
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schedule/{id}/bookmark',
            path: {
                'id': id,
            },
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 북마크 해제
     * @returns MutationResponse
     * @throws ApiError
     */
    public static scheduleControllerUnbookmark({
        id,
        uuid,
    }: {
        id: number,
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/schedule/{id}/bookmark',
            path: {
                'id': id,
            },
            headers: {
                'uuid': uuid,
            },
        });
    }

    /**
     * 휴일 일정이 있는지 조회
     * @returns PartialSchdule
     * @throws ApiError
     */
    public static scheduleControllerIsHoliday({
        date,
    }: {
        date: string,
    }): CancelablePromise<PartialSchdule> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedule/holiday/{date}',
            path: {
                'date': date,
            },
        });
    }

}
