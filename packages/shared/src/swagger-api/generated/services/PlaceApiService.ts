/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePlaceDto } from '../models/CreatePlaceDto';
import type { MutationResponse } from '../models/MutationResponse';
import type { PlaceSchoolDto } from '../models/PlaceSchoolDto';
import type { UpdatePlaceDto } from '../models/UpdatePlaceDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PlaceApiService {

    /**
     * 학교 건물 조회
     * @returns PlaceSchoolDto
     * @throws ApiError
     */
    public static placeControllerFindSchool({
        area,
    }: {
        /**
         * 구역(S,N,E)
         */
        area?: 'N' | 'S' | 'E',
    }): CancelablePromise<Array<PlaceSchoolDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/place/school',
            query: {
                'area': area,
            },
        });
    }

    /**
     * 학교 건물 생성
     * @returns MutationResponse
     * @throws ApiError
     */
    public static placeControllerCreate({
        requestBody,
    }: {
        requestBody: CreatePlaceDto,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/place/school',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 학교 건물 상세 조회
     * @returns PlaceSchoolDto
     * @throws ApiError
     */
    public static placeControllerFindOneSchool({
        id,
    }: {
        id: number,
    }): CancelablePromise<PlaceSchoolDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/place/school/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * 학교 건물 수정
     * @returns MutationResponse
     * @throws ApiError
     */
    public static placeControllerUpdate({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: UpdatePlaceDto,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/place/school/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 학교 건물 삭제
     * @returns MutationResponse
     * @throws ApiError
     */
    public static placeControllerRemove({
        id,
    }: {
        id: number,
    }): CancelablePromise<MutationResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/place/school/{id}',
            path: {
                'id': id,
            },
        });
    }

}
