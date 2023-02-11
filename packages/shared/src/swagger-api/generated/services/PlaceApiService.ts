/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlaceSchoolDto } from '../models/PlaceSchoolDto';

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

}
