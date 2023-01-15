/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSchoolDto } from '../models/CreateSchoolDto';
import type { UpdateSchoolDto } from '../models/UpdateSchoolDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SchoolApiService {

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static schoolControllerCreate(
        requestBody: CreateSchoolDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/school',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static schoolControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/school',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static schoolControllerFindOne(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/school/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static schoolControllerUpdate(
        id: number,
        requestBody: UpdateSchoolDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/school/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static schoolControllerRemove(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/school/{id}',
            path: {
                'id': id,
            },
        });
    }

}
