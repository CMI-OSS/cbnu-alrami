/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserApiService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static userControllerCreate({
        requestBody,
    }: {
        requestBody: CreateUserDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static userControllerUpdate({
        requestBody,
        uuid,
    }: {
        requestBody: UpdateUserDto,
        /**
         * 유저 UUID
         */
        uuid?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/user',
            headers: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
