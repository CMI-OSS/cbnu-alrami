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
    public static placeControllerFindSchool(): CancelablePromise<Array<PlaceSchoolDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/place/school',
        });
    }

    /**
     * 구역으로 학교 건물 조회
     * @param area
     * @returns PlaceSchoolDto
     * @throws ApiError
     */
    public static placeControllerFindSchoolByArea(
        area: string,
    ): CancelablePromise<Array<PlaceSchoolDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/place/school/{area}',
            path: {
                'area': area,
            },
        });
    }

}
